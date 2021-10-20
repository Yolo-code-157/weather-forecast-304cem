import React, { useState } from 'react'
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import MainScreen from "../../MainScreen";
import Loading from "../../Loading/Loading";
import axios from 'axios';
import ErrorMessage from "../../ErrorMessage/ErrorMessage";

const RegisterScreen = () => {

    const history = useHistory();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmpassword) {
          setMessage("Passwords do not match");
        } 
        else {
            setMessage(null)
            try {
                const config = {
                    headers: {
                        "Content-type":"application/json"
                    },
                };
                
                setLoading(true);
                const { data } = await axios.post("api/users",{
                    name,
                    email, 
                    password,
                },
                config
                );

                console.log(data);
                setLoading(false);
                localStorage.setItem('userInfo', JSON.stringify(data));
                history.push("/myweather");
            } catch (error) {
                setError(error.response.data.message);
                setLoading(false);
            }
        }
    };

    return (
        <MainScreen title="REGISTER">
            <div className="formContainer">
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
            {loading && <Loading/> }
            <div className="loginContainer">
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                        type="name"
                        value={name}
                        placeholder="Enter name"
                        onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

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
                        placeholder="Password here"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                        type="password"
                        value={confirmpassword}
                        placeholder="Confirm password here"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        Already have an account? <Link to="/login">Login Here</Link>
                    </Col>
                </Row>
            </div>
        </div>
        </MainScreen>
    );
}

export default RegisterScreen
