import './App.css';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Posts from './components/Posts';
import Post from './components/Post'
import CreatePost from './components/CreatePost';
import { Menu } from "antd";
import { ReadOutlined, FormOutlined } from "@ant-design/icons";
import UpdatePost from './components/UpdatePost';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { useState } from 'react';
import { auth } from './firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function App(props) {

    const [user, setUser] = useState(false)

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user)

        } else {
            console.log("User is signed out")
        }
    });

    const onSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("Sign-out successful.");
                setUser(false)
            })
            .catch((error) => {
                // An error happened.
            });
    };

    return (
        <div className="app-container">
            <BrowserRouter>
                <div className="navigation">
                    <Menu mode="horizontal">
                        <Menu.Item key="read" icon={<ReadOutlined />}>
                            <Link to="/">Posts</Link>
                        </Menu.Item>
                        {user && (
                            <Menu.Item key="form" icon={<FormOutlined />}>
                                <Link to="create-post">Create Post</Link>
                            </Menu.Item>
                        )}

                        {!user ? (
                            <Menu.Item>
                                <Link to="signin">Sign In</Link>
                            </Menu.Item>
                        ) : (
                            <Menu.Item>
                                <Link onClick={onSignOut}>Sign Out</Link>
                            </Menu.Item>
                        )}
                    </Menu>
                </div>
                <Routes>
                    <Route path="/" element={<Posts user={user} />} />
                    <Route path="post/:id" element={<Post user={user} />} />
                    <Route path="create-post" element={<CreatePost user={user} />} />
                    <Route path="update-post/:id" element={<UpdatePost user={user} />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="signin" element={<SignIn />} />
                </Routes>
            </BrowserRouter>
            <div className='copyright'>
                &copy; Muhammed Adil 2023
            </div>
        </div>
    );
}

export default App;