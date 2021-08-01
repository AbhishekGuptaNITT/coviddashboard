import { Button } from 'react-bootstrap'
import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import logo from '../../assets/covid-19.svg'
import firebase from 'firebase'
import firebaseui from 'firebaseui';
const header = (props) => {
    return(
        <Navbar bg="light" expand="lg" variant='light'>
            <Navbar.Brand>
            <img
                src={firebase.auth().currentUser.photoURL}
                width="40"
                height="40"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
                style={{borderRadius:'100px'}}
            />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                     <Nav.Link as={Link} to='/'>Home</Nav.Link>
                     <Nav.Link as={Link} to='/vaccine-tracker/'><strike>Vaccine Tracker</strike></Nav.Link>
                     <Nav.Link as={Link} to='/about-us'>About us</Nav.Link>
                </Nav>
                <Navbar.Text>
                    <Button onClick={() => {
                        firebase.auth().signOut()
                        // window.reload()
                    }}>Signout {firebase.auth().currentUser.displayName}</Button>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default header