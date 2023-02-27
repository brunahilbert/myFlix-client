# myMovieBox - Client

The objective of this project is to build the client-side for an application called myMovieBox based on its existing server-side code (REST API and database - [movie_api](https://github.com/brunahilbert/movie_api)). 

### Views & Features:

#### Main view
- Returns ALL movies to the user (each movie item with an image, title, release year, duration and short description)  
- Filtering the list of movies with a “search” feature  
- Ability to select a movie for more details     
- Allows users to add a movie to their list of favorites
- Ability to log out  
- Ability to navigate to Profile view

#### Single Movie view
- Returns data (description, genre, director, image) about a single movie to the user
- Allows users to add a movie to their list of favorites
- Displays similar movies genre

#### Login view
 - Allows users to log in with a username and password

#### Signup view
 - Allows new users to register (username, password, email, date of birth)

#### Profile view
 - Displays user registration details
 - Allows users to update their info (username, password, email, date of birth)
 - Displays favorite movies
 - Allows users to remove a movie from their list of favorites
 - Allows existing users to deregister


### Technical Dependencies:

- React
- SCSS
- HTML
- Parcel
- Bootstrap

Deployed version:  [https://mymoviebox.netlify.app](https://mymoviebox.netlify.app/)