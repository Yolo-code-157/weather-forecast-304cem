import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import MainScreen from "../../MainScreen";
import Loading from "../../Loading/Loading";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import axios from "axios";
import "./LoginScreen.css";

const LoginScreen = ({}) => {

    const history = useHistory();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            history.push("/");
          }
    }, [history]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-type":"application/json"
                },
            };

            setLoading(true);
            const { data } = await axios.post("api/users/login",{
                email, 
                password,
            },
            config
            );

            console.log(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            history.push("/");
        } catch (error) {
            setError(error.response.data.message);
            setLoading(false);
        }
    };

    return (
        <MainScreen title="LOGIN">
        <div className="formContainer">
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading/> }
          <div className="loginContainer">
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                        type="email"
                        value={email}
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        New User ? <Link to="/register">Register Here</Link>
                    </Col>
                </Row>
            </div>
        </div>
        </MainScreen>
    )
}

export default LoginScreen
