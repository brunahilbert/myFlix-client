import { useState } from "react";
import { Button, Form } from "react-bootstrap";

import './signup-view.scss'

export const SignupView = () => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [Birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: Username,
            Password: Password,
            Email: Email,
            Birthday: Birthday
        };

        fetch("https://my-movie-box-211a3d432647.herokuapp.com/user", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        });
    };

    return (
        <>
            <h2>Sign up</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="py-2" controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={Username}
                        onChange={(e) => setUsername(e.target.value)}
                        minLength="5"
                        required
                        placeholder="Your username must have at least 5 characters"
                    />
                </Form.Group>
                <Form.Group className="py-2" controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="Password"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Create your password"
                    />
                </Form.Group>
                <Form.Group className="py-2" controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="Email"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter a valid email"
                    />
                </Form.Group>
                <Form.Group className="py-2" controlId="formBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                        type="Date"
                        value={Birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                        placeholder="dd.mm.yyyy"
                    />
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </>
    );
};