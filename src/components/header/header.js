import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import logo from '../../assets/covid-19.svg'
const header = (props) => {
    return(
        <Navbar bg="info" expand="lg" variant='dark'>
            <Navbar.Brand>
            <img
                src={logo}
                width="40"
                height="40"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
            />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                     <Nav.Link as={Link} to='/'>Home</Nav.Link>
                     <Nav.Link as={Link} to='/vaccine-tracker/' className="text-dark">Vaccine Tracker</Nav.Link>
                     <Nav.Link as={Link} to='/about-us'>About us</Nav.Link>
                </Nav>
                <Navbar.Text>
                    <a href='https://www.linkedin.com/in/abhisheknittrichy/' target='_blank'> Site Managed by <b>Abhishek Gupta</b></a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default header