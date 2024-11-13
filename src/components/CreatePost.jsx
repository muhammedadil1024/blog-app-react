import React, { useState } from "react";
import { Typography, Input, Button } from "antd";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import db from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const { Title } = Typography;
const { TextArea } = Input;

const CreatePost = ({ user }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const titleChange = (event) => setTitle(event.target.value);
    const contentChange = (event) => setContent(event.target.value);

    const createPost = async () => {
        try {
            if (user?.uid) {
                // Add post to user's specific collection
                const userPostRef = collection(db, "users", user?.uid, "posts");
                const userPostDoc = await addDoc(userPostRef, {
                    title,
                    content,
                    authorId: user?.uid,
                });

                // Add post to top-level collection for all users
                const allPostsRef = collection(db, "posts");
                const allPostDoc = await addDoc(allPostsRef, {
                    title,
                    content,
                    authorId: user?.uid,
                    linkedId: userPostDoc.id,
                });

                // Update the first post with a link to the second post’s ID
                const userUpdatePostRef = doc(db, "users", user?.uid, "posts", userPostDoc.id);
                await updateDoc(userUpdatePostRef, {
                    linkedId: allPostDoc.id,
                });

                toast.success("Post Created Successfully");
                setTitle("");
                setContent("");
                navigate("/");
            } else {
                toast('Login required');
            }
        } catch (e) {
            toast.error("Error while Creating Post ", e.message);
        }
    };

    return (
        <div className="createp-container">
            <Toaster />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    createPost();
                }}
            >
                <div className="title">
                    <Title>Create Post</Title>
                </div>
                <div className="form-inputs">
                    <div className="input">
                        <label htmlFor="title">Post Title</label>
                        <Input placeholder="Post title" value={title} onChange={titleChange} id="title" />
                    </div>
                    <div className="textarea">
                        <label htmlFor="content">Post Content</label>
                        <TextArea placeholder="Content" rows={10} value={content} onChange={contentChange} id="content" />
                    </div>
                    <div className="button">
                        <Button type="primary" size="large" htmlType="submit">
                            Create Post
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;