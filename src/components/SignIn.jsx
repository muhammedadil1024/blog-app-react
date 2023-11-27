import React, { useState } from 'react'
import { Button, Input, Typography } from "antd";
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import "../App.css";

const { Title } = Typography; 

const SignIn = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailChange = (event) => setEmail(event.target.value);
    const passwordChange = (event) => setPassword(event.target.value);

    const onSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log('signin success', user);
            })
            .catch((error) => {
                console.log(error.code, error.message);
            });

        setEmail("");
        setPassword("");
        navigate("/");
    }

    return (
        <div className="signin-container">
            <div className="title">
                <Title>Sign In</Title>
            </div>
            <div className="signin-form-inputs">
                <div className="input">
                    <label htmlFor="email">Email</label>
                    <Input type="email" placeholder="Enter Email" id="email" onChange={emailChange} />
                </div>
                <div className="input">
                    <label htmlFor="password">Password</label>
                    <Input.Password type="password" placeholder="Enter Password" id="password" onChange={passwordChange} />
                </div>
                <div className="links">
                    <div className="link-wrap">
                        Don't have an account{" "}
                        <Link className="link" to="/signup">
                            Sign Up
                        </Link>
                    </div>
                    <div className="button">
                        <Button type="primary" size="large" onClick={onSignIn}>
                            Sign In
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn