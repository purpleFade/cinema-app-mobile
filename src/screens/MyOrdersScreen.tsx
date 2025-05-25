import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useOrders } from '../contexts/OrdersContext';
import { movies } from '../data/movies';

export default function MyOrdersScreen() {
  const { orders } = useOrders();

  const renderItem = ({ item }: { item: any }) => {
    const movie = movies.find((m) => m.id === item.movieId);
    return (
      <View style={styles.item}>
        <Text style={styles.movie}>
          🎬 {movie?.title || 'Unknown'} @ {item.showTime}
        </Text>
        <Text>💺 Seats: {item.seats.join(', ')}</Text>
        <Text>💲 Total: ${item.cost}</Text>
        <Text>👤 {item.name}</Text>
        <Text>✉️ {item.email}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {orders.length === 0 ? (
        <Text style={styles.empty}>No bookings yet.</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(_, i) => i.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  empty: { textAlign: 'center', marginTop: 20, fontSize: 16 },
  item: {
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#f1f1f1',
    borderRadius: 6,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  movie: { fontWeight: '600', marginBottom: 4 },
});
