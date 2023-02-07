import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {

  let description = movie.Description;
  if (description.length > 100) {
    description = description.substring(0, 100);
  }

  return (
    <Card className="h-100 text-center">
      <Card.Img className="p-3 pb-0" variant="top" src={movie.ImagePath} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{`${movie.Title} (${movie.releaseYear})`}</Card.Title>
        <Card.Text>{`${movie.Genre.Name} - ${movie.Duration} min`}</Card.Text>
        <Card.Text>{description + "..."}</Card.Text>
        <Button className="mt-auto" onClick={() => { onMovieClick(movie) }}>View</Button>
      </Card.Body>
    </Card>

  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    Genre: PropTypes.shape({ Name: PropTypes.string }),
    releaseYear: PropTypes.number,
    Duration: PropTypes.number
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};