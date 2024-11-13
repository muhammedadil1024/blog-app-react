import React, { useEffect, useState } from "react";
import "../App.css";
import { Typography, Input, Button } from "antd";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import db from "../firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const { Title } = Typography;
const { TextArea } = Input;

const UpdatePost = ({ user }) => {
    const { id: postId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [linkedIdState, setLinkedIdState] = useState('');

    useEffect(() => {
        if (user?.uid) {
            const fetchPost = async () => {
                // Fetch post from user's collection
                const userPostRef = doc(db, "users", user?.uid, "posts", postId);
                const userPostSnap = await getDoc(userPostRef);

                if (userPostSnap.exists()) {
                    const { title, content } = userPostSnap.data();
                    setTitle(title);
                    setContent(content);
                    const linkedId = userPostSnap.data().linkedId;
                    setLinkedIdState(linkedId);
                } else {
                    toast.error("Something went wrong, No such document in user's collection!");
                }
            };

            fetchPost();
        } else {
            toast("Please login, You don't have any post to update!")
        }
    }, [postId, user?.uid]);

    const titleChange = (event) => setTitle(event.target.value);
    const contentChange = (event) => setContent(event.target.value);

    const updatePost = async (event) => {
        event.preventDefault();
        const updatedPost = { title, content };

        try {
            if (linkedIdState) {
                const batch = writeBatch(db);

                // updating in user post collection
                const userPostRef = doc(db, "users", user?.uid, "posts", postId);
                batch.update(userPostRef, updatedPost);

                // updating in top level post collection
                const topPostRef = doc(db, "posts", linkedIdState);
                batch.update(topPostRef, updatedPost);

                // Commit both updates, batch operation
                await batch.commit();

                toast.success("Post successfully updated!");
                navigate("/");
            } else {
                throw Error("Couldn't find Post in collections")
            }
        } catch (e) {
            toast.error(e.message);
        }
    };

    return (
        <div className="updatep-container">
            <Toaster />
            <div className="title">
                <Title>Edit Post</Title>
            </div>
            <form className="form-inputs" onSubmit={updatePost}>
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
                        Save Post
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default UpdatePost;