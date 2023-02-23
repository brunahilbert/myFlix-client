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
import { SearchBar } from "../search-bar/search-bar";

export const MainView = () => {
    // the function assigned returns the visual representation of the component—in other words, the function renders what will be displayed on the screen.
    const [movies, setMovies] = useState([]);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [query, setQuery] = useState ("")


    const clearStoredUser = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
    }

    const onLoggedIn = (username, token) => {
        setUser(username);
        setToken(token);
    }

    useEffect(() => {

        if (!token) {
            return;
        }

        const getMovies = (token) => {
            fetch("https://my-movie-box.herokuapp.com/movies", {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((response) => response.json())
                .then((data) => {
                    setMovies(data);
                });
        }
        getMovies(token)

        const getUser = (token) => {
            fetch(`https://my-movie-box.herokuapp.com/users/${storedUser.Username}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((response) => response.json())
                .then((data) => {
                    setFavoriteMovies(data.FavoriteMovies);
                    setUser(data)
                });
        }

        getUser(token)
    }, [token]);

    const setFavorite = (isFavorite, movie) => {
        const method = isFavorite ? 'POST' : 'DELETE'
        fetch(`https://my-movie-box.herokuapp.com/user/${storedUser.Username}/movies/${movie._id}`, {
            method,
            headers: { Authorization: `Bearer ${storedToken}` }
        })
            .then(() => {
                if (isFavorite) {
                    setFavoriteMovies([...favoriteMovies, movie._id]);
                } else {
                    setFavoriteMovies(favoriteMovies.filter(m => m != movie._id));
                }
            });
    }

    const filteredMovies = movies.filter((movie) => {
        return(
            movie.Title.toLowerCase().includes(query.toLowerCase()) ||
            movie.Genre.Name.toLowerCase().includes(query.toLowerCase()) ||
            movie.Director.Name.toLowerCase().includes(query.toLowerCase())
        )
     })


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
                                    <Row className="search-bar-row ">
                                        <SearchBar query={query} setQuery={setQuery} />
                                    </Row>
                                    {filteredMovies.map((movie) => (
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
