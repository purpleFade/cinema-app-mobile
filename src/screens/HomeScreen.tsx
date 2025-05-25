import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Movie, movies } from '../data/movies';

type Props = NativeStackScreenProps<any, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const renderItem = ({ item }: { item: Movie }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', { movieId: item.id })}
    >
      <Image source={item.posterUrl} style={styles.poster} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(m) => m.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff' },
  card: { marginBottom: 16, alignItems: 'center' },
  poster: { width: 120, height: 180, borderRadius: 8 },
  title: { marginTop: 8, fontSize: 16 },
});
