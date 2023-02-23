import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./navigation-bar.scss"

export const NavigationBar = ({ user, onLoggedOut }) => {

    return (
        <Navbar className="fixed-top w-100" bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/" onClick={() => window.scrollTo(0, 0)}>
                    <img src="https://cdn-icons-png.flaticon.com/512/1376/1376786.png" className="movie-box-logo me-2 d-inline-block align-top" alt="My movie box logo" />
                    My Movie Box
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup">
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/" onClick={() => window.scrollTo(0, 0)}>
                                    Home
                                </Nav.Link>
                                <Nav.Link as={Link} to="/profile" onClick={() => window.scrollTo(0, 0)}>
                                    Profile
                                </Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};