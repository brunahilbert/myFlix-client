import { useState } from "react";

import { MovieCard } from "../movie-card/movie-card";

import { MovieView } from "../movie-view/movie-view";

// export = exposes the component, this makes it available for use by other components, modules, and files
export const MainView = () => {
// the function assigned returns the visual representation of the component—in other words, the function renders what will be displayed on the screen.
  const [movies, setMovies] = useState([
    {
        Genre: {
            Name: "Kids & Family",
            Description: "Kids & Family films aims to appeal not only to children, but to a wide range of ages. While the storyline may appeal to a younger audience, there are components of the film that are geared towards adults- such as witty jokes and humor."
        },
        Director: {
            Name: "Lee Unkrich",
            Bio: "Lee Edward Unkrich is an American retired film director, film editor, screenwriter, and animator. He was a longtime member of the creative team at Pixar, where he started in 1994 as a film editor.",
            Birth: 1967,
            Death: ""
        },
        Actors: [],
        _id: "637e4756fd2173cf2c109e6a",
        Title: "Coco",
        releaseYear: 2017,
        Duration: 109,
        Description: "Despite his family's generations-old ban on music, young Miguel dreams of becoming an accomplished musician like his idol Ernesto de la Cruz. Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead. After meeting a charming trickster named Héctor, the two new friends embark on an extraordinary journey to unlock the real story behind Miguel's family history.",
        ImagePath: "https://m.media-amazon.com/images/M/MV5BYjQ5NjM0Y2YtNjZkNC00ZDhkLWJjMWItN2QyNzFkMDE3ZjAxXkEyXkFqcGdeQXVyODIxMzk5NjA@._V1_FMjpg_UY720_.jpg",
        Featured: true
    },
    {
        Genre: {
            Name: "Comedy",
            Description: "Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect."
        },
        Director: {
            Name: "Glenn Ficarra",
            Bio: "Glenn Ficarra is an American filmmaker and actor.",
            Birth: 1969,
            Death: ""
        },
        Actors: [],
        _id: "637e471cfd2173cf2c109e69",
        Title: "Crazy, Stupid, Love",
        releaseYear: 2011,
        Duration: 118,
        Description: "Cal Weaver (Steve Carell) is living the American dream. He has a good job, a beautiful house, great children and a beautiful wife, named Emily (Julianne Moore). Cal's seemingly perfect life unravels, however, when he learns that Emily has been unfaithful and wants a divorce. Over 40 and suddenly single, Cal is adrift in the fickle world of dating. Enter, Jacob Palmer (Ryan Gosling), a self-styled player who takes Cal under his wing and teaches him how to be a hit with the ladies.",
        ImagePath: "https://m.media-amazon.com/images/M/MV5BMTg2MjkwMTM0NF5BMl5BanBnXkFtZTcwMzc4NDg2NQ@@._V1_FMjpg_UY711_.jpg",
        Featured: false
    },
    {
        Genre: {
            Name: "Thriller",
            Description: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
        },
        Director: {
            Name: "Jonathan Demme",
            Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
            Birth: 1944,
            Death: 2017
        },
        Actors: [],
        _id: "637e46c3fd2173cf2c109e68",
        Title: "Silence of the Lambs",
        releaseYear: 1991,
        Duration: 118,
        Description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
        ImagePath: "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UY720_.jpg",
        Featured: false
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
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