import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss";

export const MovieCard = ({ movie, isFavorite, setFavorite }) => {

  let description = movie.Description;
  if (description.length > 100) {
    description = description.substring(0, 100);
  }


  return (
    <Card className="h-100 text-center">
      <Card.Img className="p-3 pb-0 img" variant="top" src={movie.ImagePath} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{`${movie.Title} (${movie.releaseYear})`}</Card.Title>
        <Card.Text>{`${movie.Genre.Name} - ${movie.Duration} min`}</Card.Text>
        <Card.Text>{description + "..."}</Card.Text>
        <div className="mt-auto">
          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
            <Button className="mx-2" variant="primary" >View</Button>
          </Link>
          <Button className="btn-primary mx-2" onClick={() => setFavorite(!isFavorite, movie)}>{isFavorite ? '★' : '☆'}</Button>
        </div>
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
  }).isRequired
};