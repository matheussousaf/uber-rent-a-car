import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap'
import UberLogo from '../../assets/images/uberlogo.png';
import './NavbarUber.css';

export default class NavbarUber extends Component {
    render() {
        return (
            <div className="container-slider">
                <div>
                    <Navbar bg="ice-white" variant="light">
                        <Navbar.Brand href="#home"><img className="logo" src={UberLogo} alt="UberLogo" /></Navbar.Brand>
                        <Nav className="ml-auto">
                            <Nav.Link className="nav-link-uber" href="#home">Home</Nav.Link>
                            <Nav.Link className="nav-link-uber" href="#features">Cars</Nav.Link>
                            <Nav.Link className="nav-link-uber" href="#pricing">Bikes</Nav.Link>
                        </Nav>
                    </Navbar>
                </div>
            </div>
        );
    }
}
