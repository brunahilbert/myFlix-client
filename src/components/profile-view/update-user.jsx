import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import moment from 'moment'

export const UpdateUser = ({ updateUser, deleteUser, setShowUpdateUserForm, user }) => {

    const [Username, setUsername] = useState(user.Username);
    const [Password, setPassword] = useState(user.Password);
    const [Email, setEmail] = useState(user.Email);
    const [Birthday, setBirthday] = useState(moment(user.Birthday).format('YYYY-MM-DD'));

    return (
        <>
            <h2 className="update-user-form-title">Update your infos</h2>
            <Form>
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
                        placeholder="Update your password"
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
                <Form.Group className="pt-2 pb-5" controlId="formBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                        type="Date"
                        value={Birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button className="m-2" onClick={() => updateUser({ Username, Password, Email, Birthday })}>Update</Button>
                <Button className="m-2" onClick={() => deleteUser()}>Deregister</Button>
                <Button className="m-2" onClick={() => setShowUpdateUserForm(false)}>Cancel</Button>
            </Form>
        </>
    )
}