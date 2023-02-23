import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

import './movie-view.scss';

export const MovieView = ({ movies, favoriteMovies, setFavorite }) => {

    const { movieId } = useParams();
    const movie = movies.find((m) => m._id === movieId);

    const isFavorite = favoriteMovies.includes(movie._id)

    return (
        <>
            <div className="movie-view-card card p-3">
                <div className="row justify-content-sm-center">
                    <div className="col-sm-12 col-lg-5 ">
                        <img className="img-card-movie-view img-fluid w-100 h-100" src={movie.ImagePath} />
                    </div>
                    <div className="col-sm-12 col-lg-7 pe-3">
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
                            <div className="mb-4">
                                <span className="fw-bold">Director: </span>
                                <span>{movie.Director.Name}</span><br />
                            </div>
                            <div>
                                <Link to={`/`}>
                                    <Button className="back-button" onClick={() => window.scrollTo(0, 0)}>Back</Button>
                                </Link>
                                <Button className="btn-primary mx-3" onClick={() => setFavorite(!isFavorite, movie)}>{isFavorite ? '★' : '☆'}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Row className="similar-movies justify-content-sm-center w-100">
                <hr />
                <h2 className="p-3 mt-5 similar-movies-text">Similar Movies:</h2>

                {movies.filter(m => m.Genre.Name === movie.Genre.Name && m._id !== movie._id).map((m) => (
                    <Col className="p-3" key={m._id} sm={6} md={4} lg={3}>
                        <MovieCard movie={m} isFavorite={favoriteMovies.includes(m._id)} setFavorite={setFavorite} />
                    </Col>
                ))}
            </Row>
        </>
    );
};

MovieView.propTypes = {
    movies: PropTypes.shape({
        ImagePath: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        releaseYear: PropTypes.number.isRequired,
        Duration: PropTypes.number.isRequired,
        Genre: PropTypes.shape({ Name: PropTypes.string.isRequired }),
        Description: PropTypes.string.isRequired,
        Actors: PropTypes.array,
        Director: PropTypes.shape({ Name: PropTypes.string.isRequired }),
    }).isRequired
};