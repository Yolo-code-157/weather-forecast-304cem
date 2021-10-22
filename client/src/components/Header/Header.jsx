import React from 'react';
import {
    Container,
    Nav,
    Navbar,
    NavDropdown,
  } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import styles from './Header.module.css';

const Header = () => {

    const history = useHistory();
    
    return(
    <Navbar collapseOnSelect expand="lg" bg="secondary" variant="dark">
        <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Navbar.Brand href="/" className={styles.heading}>
                <span className={styles.light}>Weather</span> Forecast
              </Navbar.Brand>  

              <Nav>
                  <Nav.Link>
                      <Link to="/landingpage">SignIn/Register</Link>
                  </Nav.Link>
                  <NavDropdown title="Profile" id="basic-nav-dropdown">
                      <NavDropdown.Item onClick={()=>{
                          localStorage.removeItem("userInfo");
                          history.push("/landingpage");
                      }}>Logout</NavDropdown.Item>
                  </NavDropdown>
              </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    ); 
};

export default Header;
