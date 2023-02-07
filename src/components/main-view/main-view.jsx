import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Button, Row, Col } from "react-bootstrap";

import './main-view.scss'

// export = exposes the component, this makes it available for use by other components, modules, and files
export const MainView = () => {
    // the function assigned returns the visual representation of the component—in other words, the function renders what will be displayed on the screen.
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    useEffect(() => {
        if (!token) {
            return;
        }
        fetch("https://my-movie-box.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                setMovies(data);
            });
    }, [token]);

    return (
        <Row className="justify-content-sm-center">
            {!user ? (
                <Col className="p-5 rounded login-signup-view" md={7} lg={5}>
                    <LoginView onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }} />

                    <hr className="my-5" />

                    <SignupView />
                </Col>
            ) : selectedMovie ? (
                <>
                    <Col className="p-4 movie-view" sm={8}>
                        <MovieView movie={selectedMovie} onBackClick={() => { setSelectedMovie(null); }} />
                    </Col>
                    <hr />
                    <h2 className="p-3 mt-5 similar-movies-text">Similar Movies:</h2>
                    {movies.filter(movie => movie.Genre.Name === selectedMovie.Genre.Name && movie._id !== selectedMovie._id).map((movie) => (
                        <Col className="mx-auto" key={movie._id} xs={6} sm={6} md={4} lg={3}>
                            <MovieCard
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => { setSelectedMovie(newSelectedMovie); }} />
                        </Col>
                    ))}
                </>
            ) : movies.length === 0 ? (
                <div>The list is empty!</div>
            ) : (
                <>
                    <Button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
                    {movies.map((movie) => (
                        <Col className="p-3" key={movie._id} sm={6} md={4} lg={3} xl={2}>
                            <MovieCard
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        </Col>
                    ))}
                </>
            )}
        </Row>


    );
};
