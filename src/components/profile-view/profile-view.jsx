import { useState } from "react";
import { UserInfo } from "./user-info";
import { UpdateUser } from "./update-user";
import { MovieCard } from "../movie-card/movie-card";
import { Col, Container, Row } from "react-bootstrap";

import './profile-view.scss'

export const ProfileView = ({ user, movies, favoriteMovies, setFavorite, token, clearStoredUser }) => {

    const favoriteMoviesList = movies.filter(m => favoriteMovies.includes(m._id))
    const [showUpdateUserForm, setShowUpdateUserForm] = useState(false);

    const deleteUser = () => {
        fetch(`https://my-movie-box.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        })
            .then((response) => {
                if (response.ok) {
                    alert("User was deleted");
                    clearStoredUser()
                } else
                    alert("Something went wrong");
                console.log(response);
            });

    }

    const updateUser = (userData) => {

        fetch(`https://my-movie-box.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        })
            .then((response) => {
                if (response.ok) {
                    alert("User was updated");
                    window.location.reload();
                    console.log(response);
                } else
                    alert("Something went wrong");
                console.log(response);
            });
    }


    return (
        <Container>
            <Row className="profile-view h-100 justify-content-xs-center">
                {!showUpdateUserForm ? (
                    <Col className="mx-auto" xs={10} lg={6}>
                        <UserInfo
                            name={user.Username}
                            email={user.Email}
                            birthday={user.Birthday}
                            setShowUpdateUserForm={setShowUpdateUserForm}
                        />
                    </Col>
                ) : (
                    <Col className="update-user-view mx-auto mb-4 p-4 rounded" xs={10} lg={6}>
                        <UpdateUser
                            user={user}
                            updateUser={updateUser}
                            setShowUpdateUserForm={setShowUpdateUserForm}
                            deleteUser={deleteUser}
                        />
                    </Col>

                )}
                <Row className="justify-content-center">
                    <h2 className="your-favorite-movies-text mt-5">Your favorite movies:</h2>
                    {favoriteMoviesList.map((m) => (
                        <Col className="p-3" key={m._id} sm={6} md={4} lg={3}>
                            <MovieCard
                                movie={m}
                                setFavorite={setFavorite}
                                isFavorite={favoriteMovies.includes(m._id)}
                            />
                        </Col>
                    ))}
                </Row>
            </Row>
        </Container>
    )
}

