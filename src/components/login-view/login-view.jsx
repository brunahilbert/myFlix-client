import { useState } from "react";
import { Button, Form } from "react-bootstrap";

import './login-view.scss';

export const LoginView = ({ onLoggedIn }) => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");

    const handleSubmit = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();

        const data = {
            Username: Username,
            Password: Password
        };

        fetch("https://my-movie-box.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("No such user");
                }
            })
            .catch((e) => {
                console.log(e)
                alert("Something went wrong");
            });

    }
    return (
        <>
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="py-2" controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={Username}
                        onChange={(e) => setUsername(e.target.value)}
                        minLength="5"
                        required
                        placeholder="Enter your username"
                    />
                </Form.Group>

                <Form.Group className="py-2" controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="Password"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                    />
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </>
    );
};