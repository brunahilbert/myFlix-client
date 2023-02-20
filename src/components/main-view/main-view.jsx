import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { ProfileView } from "../profile-view/profile-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => { setUser(null); setToken(null); localStorage.clear(); }} />
            <Row className="justify-content-sm-center">
                <Routes>
                    <Route path="/signup" element={
                        <>
                            {user ? (
                                <Navigate to="/" />
                            ) : (
                                <Col xs={10} md={8} lg={6} xl={5} className="p-5 mx-auto rounded login-signup-view">
                                    <SignupView />
                                </Col>
                            )}
                        </>
                    }
                    />

                    <Route path="/login" element={
                        <>
                            {user ? (
                                <Navigate to="/" />
                            ) : (
                                <Col xs={10} md={8} lg={6} xl={5} className="p-5 mx-auto rounded login-signup-view">
                                    <LoginView onLoggedIn={onLoggedIn} />
                                </Col>
                            )}
                        </>
                    }
                    />

                    <Route path="/profile" element={
                        <>
                            {user ? (
                                <ProfileView
                                    user={user}
                                    movies={movies}
                                    setFavorite={setFavorite}
                                    favoriteMovies={favoriteMovies}
                                    token={token}
                                    clearStoredUser={clearStoredUser}
                                />
                            ) : (
                                <Col xs={10} md={8} lg={6} xl={5} className="p-5 mx-auto rounded login-signup-view">
                                    <LoginView onLoggedIn={onLoggedIn} />
                                </Col>
                            )}
                        </>
                    }
                    />

                    <Route path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <div>The list is empty!</div>
                                ) : (
                                    <>
                                        <Col className="p-4 movie-view">
                                            <MovieView
                                                movies={movies}
                                                favoriteMovies={favoriteMovies}
                                                setFavorite={setFavorite}
                                            />
                                        </Col>
                                    </>
                                )}
                            </>
                        }
                    />

                    <Route path="/" element={
                        <>
                            {!user ? (
                                <Navigate to="/login" replace />
                            ) : movies.length === 0 ? (
                                <div>The list is empty!</div>
                            ) : (
                                <>
                                    {movies.map((movie) => (
                                        <Col className="p-3 movie-card" key={movie._id} sm={6} md={4} lg={3} xl={2}>
                                            <MovieCard
                                                movie={movie}
                                                isFavorite={favoriteMovies.includes(movie._id)}
                                                setFavorite={setFavorite}
                                            />
                                        </Col>
                                    ))}
                                </>
                            )}
                        </>
                    }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
