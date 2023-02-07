import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

import './movie-view.scss';

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div className="card">

            <img className="w-100 card-img-top" src={movie.ImagePath} />

            <div className="card-body">
                <h2 className="card-title text-center my-4">{movie.Title}</h2>
                <div className="mb-3">
                    <span className="fw-bold">Release year: </span>
                    <span>{movie.releaseYear}</span><br />
                </div>
                <div className="mb-3">
                    <span className="fw-bold">Duration: </span>
                    <span>{movie.Duration} minutes</span><br />
                </div>
                <div className="mb-3">
                    <span className="fw-bold">Genre: </span>
                    <span>{movie.Genre.Name}</span><br />
                </div>
                <div className="mb-3">
                    <span className="fw-bold">Description: </span>
                    <span>{movie.Description}</span><br />
                </div>
                <div className="mb-3">
                    <span className="fw-bold">Actors: </span>
                    <span>{movie.Actors}</span><br />
                </div>
                <div className="mb-3">
                    <span className="fw-bold">Director: </span>
                    <span>{movie.Director.Name}</span><br />
                </div>
            </div>
            <Button onClick={onBackClick} className="mx-auto back-button">Back</Button>
        </div>
    );
};

MovieView.propTypes = {
    movie: PropTypes.shape({
        ImagePath: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        releaseYear: PropTypes.number.isRequired,
        Duration: PropTypes.number.isRequired,
        Genre: PropTypes.shape({ Name: PropTypes.string.isRequired }),
        Description: PropTypes.string.isRequired,
        Actors: PropTypes.array,
        Director: PropTypes.shape({ Name: PropTypes.string.isRequired }),
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};