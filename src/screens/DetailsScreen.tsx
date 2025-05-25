// src/screens/DetailsScreen.tsx
import React from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { movies, Movie } from '../data/movies';

type Props = NativeStackScreenProps<any, 'Details'>;

export default function DetailsScreen({ route, navigation }: Props) {
  const { movieId } = route.params as { movieId: string };
  const movie = movies.find((m) => m.id === movieId);

  if (!movie) {
    return (
      <View style={styles.notFound}>
        <Text>Movie not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={movie.posterUrl} style={styles.poster} />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.meta}>Runtime: {movie.runtime} min</Text>
      <Text style={styles.overview}>{movie.overview}</Text>

      <Text style={styles.sectionHeader}>Show Times:</Text>
      <View style={styles.timesContainer}>
        {movie.showTimes.map((time) => (
          <TouchableOpacity
            key={time}
            style={styles.timeButton}
            onPress={() =>
              navigation.navigate('Checkout', { movieId, showTime: time })
            }
          >
            <Text style={styles.timeText}>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  poster: { width: '100%', height: 300, borderRadius: 8 },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 12 },
  meta: { fontSize: 14, color: '#666', marginTop: 4 },
  overview: { fontSize: 16, lineHeight: 22, marginTop: 12 },
  sectionHeader: { marginTop: 20, fontSize: 18, fontWeight: '600' },
  timesContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  timeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: '#eee',
    marginRight: 8,
    marginBottom: 8,
  },
  timeText: { fontSize: 14 },
  notFound: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
