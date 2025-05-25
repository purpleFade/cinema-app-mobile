import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useOrders } from '../contexts/OrdersContext';
import { movies } from '../data/movies';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Checkout'>;
type CheckoutRouteProp = RouteProp<RootStackParamList, 'Checkout'>;

const SEATS = Array.from({ length: 50 }, (_, i) => (i + 1).toString());
const SEAT_PRICE = 5;

export default function CheckoutScreen({ navigation }: Props) {
  const route = useRoute<CheckoutRouteProp>();
  const { movieId, showTime } = route.params;
  const { addOrder } = useOrders();
  const movie = movies.find((m) => m.id === movieId);

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [nameError, setNameError] = useState<string | undefined>();
  const [emailError, setEmailError] = useState<string | undefined>();
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    setNameError(
      name.trim().length >= 2
        ? undefined
        : 'Name must be at least 2 characters',
    );

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(email) ? undefined : 'Invalid email address');

    setCanSubmit(
      selectedSeats.length > 0 &&
        name.trim().length >= 2 &&
        emailRegex.test(email),
    );
  }, [name, email, selectedSeats]);

  if (!movie) return <Text>Movie not found</Text>;

  const toggleSeat = (seat: string) =>
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat],
    );

  const cost = selectedSeats.length * SEAT_PRICE;

  const handleConfirm = () => {
    addOrder({ movieId, showTime, seats: selectedSeats, name, email, cost });
    Alert.alert(
      'Booked!',
      `🎟 ${movie.title} @ ${showTime}\nSeats: ${selectedSeats.join(
        ', ',
      )}\nTotal: $${cost}`,
      [{ text: 'OK', onPress: () => navigation.navigate('MyOrders') }],
    );
  };

  const renderSeat = ({ item }: { item: string }) => {
    const isSelected = selectedSeats.includes(item);
    return (
      <TouchableOpacity
        style={[styles.seat, isSelected && styles.seatSelected]}
        onPress={() => toggleSeat(item)}
      >
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 80}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Select Seats (${SEAT_PRICE} each):</Text>
        <FlatList
          data={SEATS}
          keyExtractor={(s) => s}
          renderItem={renderSeat}
          numColumns={5}
          scrollEnabled={false}
          style={styles.grid}
        />

        <Text style={styles.total}>Total: ${cost}</Text>

        <TextInput
          placeholder='Your Name'
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        {nameError && <Text style={styles.error}>{nameError}</Text>}

        <TextInput
          placeholder='Your Email'
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
          autoCapitalize='none'
          style={styles.input}
        />
        {emailError && <Text style={styles.error}>{emailError}</Text>}

        <Button
          title={`Confirm (${selectedSeats.length} seats)`}
          onPress={handleConfirm}
          disabled={!canSubmit}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  grid: { marginBottom: 12 },
  seat: {
    flex: 1,
    margin: 4,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 4,
  },
  seatSelected: {
    backgroundColor: '#cce5ff',
    borderColor: '#66b0ff',
  },
  total: { fontSize: 16, fontWeight: '500', marginVertical: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 4,
    borderRadius: 4,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});
