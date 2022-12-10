import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';

/**
 * Navigation bar for the application
 * @param {*} props 
 * @returns the navbar component
 */
export default function Navigation(props){
    if (props.loggedIn === true){
        return(
            <Navbar bg="dark" variant="dark">
                <Container className="left-cont">
                    <Navbar.Brand>(sked.)</Navbar.Brand>
                    <Nav className="me-auto">
                    </Nav>
                </Container>
                <Container className="right-cont">
                    <Nav className="me-auto right-nav">
                        <Nav.Link href="/">logout!</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        );
    }
    else {
        return(
            <Navbar bg="dark" variant="dark">
                <Container className="center-cont">
                    <Navbar.Brand href="/">(sked.)</Navbar.Brand>
                </Container>
            </Navbar>
        );
    }
}