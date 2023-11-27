import React, { useEffect, useState } from 'react'
import { Typography } from "antd";
import db from '../firebaseConfig'
import { collection, onSnapshot } from "firebase/firestore";
import PostSnippet from './PostSnippet';
import "../App.css";

const { Title } = Typography;

const Posts = (props) => {

    // const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    // if any error had uncomment the useEffect below

    // useEffect(() => {
    //     console.log(props.user);
    //     // Update user state when props.user changes
    //     setUser(props.user);
    // }, [props.user]);

    useEffect(() => {
        // console.log("User in useEffect:", user);
        // console.log("User UID in useEffect:", user?.uid);

        const fetchPosts = () => {
            // Check if user and user.uid are defined
            // if (user && user.uid) {

                // let userId = props?.user.uid ? props?.user.uid : props.uid;
                const path = props?.user.uid ? `users/${props.user.uid}/posts` : "posts"

                onSnapshot(
                    collection(db, path),
                    async (posts) => {
                        let postData = await posts.docs.map((post) => {
                            let data = post.data();
                            let { id } = post;

                            let loadedData = {
                                id,
                                ...data,
                            };
                            return loadedData;
                        });

                        setPosts(postData);
                    },
                    (error) => {
                        console.error("Error fetching posts:", error); // Log any errors that might occur during fetching
                    }
                );
            // } else {
                // console.error("User or user.uid is undefined");
            // }
        };
        fetchPosts();
        // if you use user state, make sure you add the dependency as user
    }, [ props.user.uid, props.uid]);

    return (
        <div className="post-container">
            <div className="title">
                <Title>Blog Posts</Title>
            </div>
            <div className="articles">
                {posts.map((post, idx) => (
                    <PostSnippet
                        key={idx}
                        id={post.id}
                        title={post.title}
                        content={post.content.substring(1, 600)}
                        user={props.user}
                        uid={props.uid}
                    />
                ))}
            </div>
        </div>
    );
}

export default Posts