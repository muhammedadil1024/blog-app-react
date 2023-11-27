import React, { useState } from 'react'
import { Button, Input, Typography } from "antd";
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import "../App.css";

const { Title } = Typography 

const SignUp = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const emailChange = (event) => setEmail(event.target.value);
    const passwordChange = (event) => setPassword(event.target.value);

    const onSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                console.log('signup success', user);
            })
            .catch((error) => {
                console.log(error.code, error.message);
                // clear the state fields if  there is any error
            });

        setEmail('')
        setPassword('')
        navigate("/");
    }

    return (
        <div className="signup-container">
            <div className="title">
                <Title>Sign Up</Title>
            </div>
            <div className="signup-form-inputs">
                <div className="input">
                    <label htmlFor="name">Name</label>
                    <Input type="text" placeholder="Enter Name" id="name" />
                </div>
                <div className="input">
                    <label htmlFor="phone">Phone No</label>
                    <Input type="text" placeholder="Enter Phone Number" id="phone" />
                </div>
                <div className="input">
                    <label htmlFor="email">Email</label>
                    <Input type="email" placeholder="Enter Email" id="email" onChange={emailChange} />
                </div>
                <div className="input">
                    <label htmlFor="password">Password</label>
                    <Input.Password placeholder="Enter Password" id="password" onChange={passwordChange} />
                </div>
                <div className="links">
                    <div className="link-wrap">
                        Already have an account{" "}
                        <Link className="link" to="/signin">
                            Sign In
                        </Link>
                    </div>
                    <div className="button">
                        <Button type="primary" size="large" onClick={onSignUp}>
                            Sign Up
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp