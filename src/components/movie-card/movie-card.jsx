import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        {movie.Title}
      </div>
    );
  };

  // Update in the future!!
  MovieCard.propTypes = {
    movie: PropTypes.shape({
      ImagePath: PropTypes.string,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string,
      Genre: PropTypes.shape({Name: PropTypes.string})
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };