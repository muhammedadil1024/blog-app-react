import React, { useState } from "react";
import { Button, Input, Typography } from "antd";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import toast, { Toaster } from "react-hot-toast";

const { Title } = Typography;

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailChange = (event) => setEmail(event.target.value);
    const passwordChange = (event) => setPassword(event.target.value);

    const onSignIn = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // Signed in
            const user = userCredential.user;
            toast.success("Login success");
            if (user) {
                setEmail("");
                setPassword("");
                navigate("/");
            }
        } catch (error) {
            toast.error("Error while signing in: ", error.message);
        }
    };

    return (
        <div className="signin-container">
            <Toaster  />
            <form onSubmit={onSignIn}>
                <div className="title">
                    <Title>Sign In</Title>
                </div>
                <div className="signin-form-inputs">
                    <div className="input">
                        <label htmlFor="email">Email</label>
                        <Input type="email" placeholder="Enter Email" id="email" value={email} onChange={emailChange} required />
                    </div>
                    <div className="input">
                        <label htmlFor="password">Password</label>
                        <Input.Password
                            placeholder="Enter Password"
                            id="password"
                            value={password}
                            onChange={passwordChange}
                            required
                        />
                    </div>
                    <div className="links">
                        <div className="link-wrap">
                            Don't have an account{" "}
                            <Link className="link" to="/signup">
                                Sign Up
                            </Link>
                        </div>
                        <div className="button">
                            <Button type="primary" size="large" htmlType="submit">
                                Sign In
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignIn;