import React, {Fragment} from 'react'

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import './LandingPage.css';

const LandingPage = () => {
    
    return (
        <Fragment>
        <div className="intro-text">
            <br/><br/><br/><br/>
            <div className="box">
                <h1>Welcome :P</h1>
            </div><br/>
            <div  className="intro-text">please proceed with your preferred choice</div>
            <div className="buttonContainer">
            <Link to="/login">
                <Button size="lg" className="landingbutton">
                Login
                </Button>
            </Link>
            <Link to="/register">
                <Button
                variant="outline-primary"
                size="lg"
                className="landingbutton"
                >
                Signup
                </Button>
            </Link>
            </div>
        </div>
        </Fragment>
    );
}

export default LandingPage;