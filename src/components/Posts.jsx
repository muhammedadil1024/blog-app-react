import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import db from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import PostSnippet from "./PostSnippet";
import "../App.css";
import toast, { Toaster } from "react-hot-toast";

const { Title } = Typography;

const Posts = ({ user }) => {
    const [posts, setPosts] = useState([]);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        // Fetch all posts
        const fetchPosts = () => {
            const path = "posts";
            onSnapshot(
                collection(db, path),
                (snapshot) => {
                    const allPosts = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setPosts(allPosts);
                },
                (error) => {
                    toast.error("Error fetching posts ", error);
                }
            );
        };

        // Fetch user-specific posts if authenticated
        const fetchUserPosts = () => {
            if (user?.uid) {
                const userPostsPath = `users/${user?.uid}/posts`;
                onSnapshot(
                    collection(db, userPostsPath),
                    (userPostsSnapshot) => {
                        const userPosts = userPostsSnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                        setUserPosts(userPosts);
                    },
                    (error) => {
                        toast.error("Error fetching user posts ", error.message);
                    }
                );
            }
        };

        fetchPosts();
        fetchUserPosts();
    }, [user?.uid]);

    return (
        <div className="post-container">
            <Toaster />
            {user?.uid && (
                <>
                    <div className="title">
                        <Title>Your Blog Posts</Title>
                    </div>
                    <div className="articles">
                        {userPosts.map((post) => (
                            <PostSnippet
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                content={post.content.substring(0, 600)}
                                user={user}
                                authorId={user?.uid} 
                            />
                        ))}
                    </div>
                </>
            )}
            <div className="title">
                <Title>Blog Posts</Title>
            </div>
            <div className="articles">
                {posts.map((post) => (
                    <PostSnippet
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        content={post.content.substring(0, 600)}
                        user={user}
                        authorId={post.authorId} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Posts;