import React , {Component} from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import './Page.css';


class Navbars extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">WebNet</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Router>
                            <Nav.Link href="/create">Create</Nav.Link> &nbsp; &nbsp;
                            <Nav.Link href="/display">Display</Nav.Link>
                        </Router>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            
        );
    }
}

export default Navbars;