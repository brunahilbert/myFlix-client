import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";

import { MovieView } from "../movie-view/movie-view";

// export = exposes the component, this makes it available for use by other components, modules, and files
export const MainView = () => {
    // the function assigned returns the visual representation of the component—in other words, the function renders what will be displayed on the screen.
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://my-movie-box.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {
                setMovies(data);
            });
    },);

    if (selectedMovie) {
        let similarMovies = movies.filter(movie => movie.Genre.Name === selectedMovie.Genre.Name && movie._id !== selectedMovie._id);
        return (
            <>
                <MovieView movie={selectedMovie} onBackClick={() => { setSelectedMovie(null); }} />
                <hr />
                <h2>Similar Movies:</h2>
                {similarMovies.map((movie) => (
                    <MovieCard
                        key={movie._id}
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => { setSelectedMovie(newSelectedMovie); }} />
                ))}
            </>
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};
