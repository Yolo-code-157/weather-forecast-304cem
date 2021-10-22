import React from 'react'

import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const LandingPage = () => {
    
    return (
        <Fragment>
        <div className="main">
                <div>
                    <h1>Welcome To Weather Forecast</h1>
                </div>
                <br/>
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