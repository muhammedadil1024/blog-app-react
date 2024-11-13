import React, { useState } from 'react';
import { Button, Input, Typography } from 'antd';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import toast, { Toaster } from 'react-hot-toast';

const { Title } = Typography;

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailChange = (event) => setEmail(event.target.value);
    const passwordChange = (event) => setPassword(event.target.value);

    const onSignUp = async (event) => {
        event.preventDefault();
        try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Signed up
        const user = userCredential.user;
        toast.success("Registration success");
        if (user) {
            setEmail("");
            setPassword("");
            navigate("/");
        }
        toast.success("Registration success", { duration: 4000 });
        } catch (error) {
            toast.error('Error while registering ', error.message);
        }
    };

    return (
        <div className="signup-container">
            <Toaster />
            <form onSubmit={onSignUp}>
                <div className="title">
                    <Title>Sign Up</Title>
                </div>
                <div className="signup-form-inputs">
                    <div className="input">
                        <label htmlFor="name">Name</label>
                        <Input type="text" placeholder="Enter Name" id="name" required />
                    </div>
                    <div className="input">
                        <label htmlFor="email">Email</label>
                        <Input
                            type="email"
                            placeholder="Enter Email"
                            id="email"
                            value={email}
                            onChange={emailChange}
                            required
                        />
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
                            Already have an account{" "}
                            <Link className="link" to="/signin">
                                Sign In
                            </Link>
                        </div>
                        <div className="button">
                            <Button type="primary" size="large" htmlType="submit">
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUp;