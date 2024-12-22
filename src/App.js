import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Posts from "./components/Posts";
import Post from "./components/Post";
import CreatePost from "./components/CreatePost";
import { Menu } from "antd";
import { ReadOutlined, FormOutlined } from "@ant-design/icons";
import UpdatePost from "./components/UpdatePost";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { useState, useEffect } from "react";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // user auth state changing
        const userStateChange = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => userStateChange();
    }, []);

    const onSignOut = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
                toast.success("Sign-out successful.");
            })
            .catch((e) => {
                toast.error("Error while Sign-out" ,e.message);
            });
    };

    return (
        <div className="app-container">
            <BrowserRouter>
                <Toaster />
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
                            <Menu.Item key="signin">
                                <Link to="signin">Sign In</Link>
                            </Menu.Item>
                        ) : (
                            <Menu.Item key="signout">
                                <Link to="/" onClick={onSignOut}>
                                    Sign Out
                                </Link>
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
            <div className="copyright">&copy; Muhammed Adil {new Date().getFullYear()}</div>
        </div>
    );
}

export default App;

// this is old App.js

// import './App.css';
// import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
// import Posts from './components/Posts';
// import Post from './components/Post'
// import CreatePost from './components/CreatePost';
// import { Menu } from "antd";
// import { ReadOutlined, FormOutlined } from "@ant-design/icons";
// import UpdatePost from './components/UpdatePost';
// import SignUp from './components/SignUp';
// import SignIn from './components/SignIn';
// import { useState } from 'react';
// import { auth } from './firebaseConfig';
// import { onAuthStateChanged, signOut } from 'firebase/auth';

// function App() {

//     const [user, setUser] = useState(false)

//     onAuthStateChanged(auth, (user) => {
//         if (user) {
//             setUser(user)

//         } else {
//             alert("User is signed out")
//         }
//     });

//     const onSignOut = () => {
//         signOut(auth)
//             .then(() => {
//                 alert("Sign-out successful.");
//                 setUser(false)
//             })
//             .catch((e) => {
//                 console.error(e);
//             });
//     };

//     return (
//         <div className="app-container">
//             <BrowserRouter>
//                 <div className="navigation">
//                     <Menu mode="horizontal">
//                         <Menu.Item key="read" icon={<ReadOutlined />}>
//                             <Link to="/">Posts</Link>
//                         </Menu.Item>
//                         {user && (
//                             <Menu.Item key="form" icon={<FormOutlined />}>
//                                 <Link to="create-post">Create Post</Link>
//                             </Menu.Item>
//                         )}

//                         {!user ? (
//                             <Menu.Item>
//                                 <Link to="signin">Sign In</Link>
//                             </Menu.Item>
//                         ) : (
//                             <Menu.Item>
//                                 <Link onClick={onSignOut}>Sign Out</Link>
//                             </Menu.Item>
//                         )}
//                     </Menu>
//                 </div>
//                 <Routes>
//                     <Route path="/" element={<Posts user={user} />} />
//                     <Route path="post/:id" element={<Post user={user} />} />
//                     <Route path="create-post" element={<CreatePost user={user} />} />
//                     <Route path="update-post/:id" element={<UpdatePost user={user} />} />
//                     <Route path="signup" element={<SignUp />} />
//                     <Route path="signin" element={<SignIn />} />
//                 </Routes>
//             </BrowserRouter>
//             <div className='copyright'>
//                 &copy; Muhammed Adil 2024
//             </div>
//         </div>
//     );
// }

// export default App;
