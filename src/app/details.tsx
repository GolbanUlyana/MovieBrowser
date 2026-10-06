import { getMovieDetails, MovieDetails } from '@/api/omdb';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DetailsScreen() {
  const { imdbID } = useLocalSearchParams<{ imdbID: string }>();
  const router = useRouter();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!imdbID) return;
      const data = await getMovieDetails(imdbID);
      setMovie(data);
      setLoading(false);
    };
    fetchDetails();
  }, [imdbID]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Не вдалося завантажити інформацію</Text>
      </View>
    );
  }

  const posterUrl =
    movie.Poster && movie.Poster !== 'N/A'
      ? movie.Poster
      : 'https://via.placeholder.com/300x450?text=No+Poster';

  const InfoRow = ({
    icon,
    label,
    value,
  }: {
    icon: any;
    label: string;
    value: string;
  }) => {
    if (!value || value === 'N/A') return null;
    return (
      <View style={styles.infoRow}>
        <Ionicons name={icon} size={20} color="#3498db" style={styles.infoIcon} />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoLabel}>{label}</Text>
          <Text style={styles.infoValue}>{value}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Деталі</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.posterContainer}>
          <Image source={{ uri: posterUrl }} style={styles.poster} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{movie.Title}</Text>

          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={20} color="#f39c12" />
            <Text style={styles.rating}>{movie.imdbRating}</Text>
            <Text style={styles.votes}>({movie.imdbVotes} голосів)</Text>
          </View>

          <View style={styles.genreContainer}>
            {movie.Genre &&
              movie.Genre !== 'N/A' &&
              movie.Genre.split(', ').map((genre, index) => (
                <View key={index} style={styles.genreBadge}>
                  <Text style={styles.genreText}>{genre}</Text>
                </View>
              ))}
          </View>

          <Text style={styles.sectionTitle}>📖 Сюжет</Text>
          <Text style={styles.plot}>{movie.Plot}</Text>

          <Text style={styles.sectionTitle}>ℹ️ Інформація</Text>
          <InfoRow icon="calendar-outline" label="Рік" value={movie.Year} />
          <InfoRow icon="time-outline" label="Тривалість" value={movie.Runtime} />
          <InfoRow icon="videocam-outline" label="Режисер" value={movie.Director} />
          <InfoRow icon="people-outline" label="Актори" value={movie.Actors} />
          <InfoRow icon="globe-outline" label="Країна" value={movie.Country} />
          <InfoRow icon="language-outline" label="Мова" value={movie.Language} />
          <InfoRow icon="trophy-outline" label="Нагороди" value={movie.Awards} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#2c3e50',
  },
  backButton: { padding: 4 },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  posterContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#2c3e50',
  },
  poster: {
    width: 200,
    height: 300,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f39c12',
    marginLeft: 4,
  },
  votes: {
    fontSize: 12,
    color: '#7f8c8d',
    marginLeft: 8,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  genreBadge: {
    backgroundColor: '#3498db',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  genreText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 16,
    marginBottom: 8,
  },
  plot: {
    fontSize: 15,
    lineHeight: 22,
    color: '#34495e',
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  infoIcon: { marginRight: 12, marginTop: 2 },
  infoTextContainer: { flex: 1 },
  infoLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    color: '#2c3e50',
    fontWeight: '500',
  },
});