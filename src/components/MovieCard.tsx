import { Movie } from '@/api/omdb';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MovieCardProps {
  movie: Movie;
  onPress: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress }) => {
  const posterUrl =
    movie.Poster && movie.Poster !== 'N/A'
      ? movie.Poster
      : 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: posterUrl }} style={styles.poster} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.Title}
        </Text>
        <Text style={styles.year}>{movie.Year}</Text>
        <Text style={styles.type}>{movie.Type}</Text>
      </View>
    </TouchableOpacity>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    imdbID: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string,
    Poster: PropTypes.string,
    Type: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  year: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 2,
  },
  type: {
    fontSize: 12,
    color: '#3498db',
    textTransform: 'capitalize',
    fontWeight: '600',
  },
});

export default MovieCard;