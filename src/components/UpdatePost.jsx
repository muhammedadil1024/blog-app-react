import React, { useEffect, useState } from "react";
import "../App.css";
import { Typography, Input, Button } from "antd";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const { Title } = Typography;
const { TextArea } = Input;

const UpdatePost = (props) => {

    const postId = useParams();

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchedPost = async () => {
            const postRef = doc(db, "users", props.user.uid, "posts", postId.id);
            // retrieving single post from database
            const docSnap = await getDoc(postRef);

            if (docSnap.exists()) {
                let { content, title } = docSnap.data();
                setTitle(title);
                setContent(content);
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        };
        fetchedPost();
    });

    const titleChange = (event) => setTitle(event.target.value);
    const contentChange = (event) => setContent(event.target.value);

    const updatePost = async () => {

        const postRef = doc(db, "users", props.user.uid, "posts", postId.id);

        let load = {title, content}

        await updateDoc(postRef, {
            load
        });
        console.log("Document successfully updated");

        navigate("/");
    };

    return (
        <div className="updatep-container">
            <div className="title">
                <Title>Edit Post</Title>
            </div>
            <div className="form-inputs">
                <div className="input">
                    <label htmlFor="title">Post Title</label>
                    <Input placeholder="Post title" value={title} onChange={titleChange} id="title"/>
                </div>
                <div className="textarea">
                    <label htmlFor="content">Post Content</label>
                    <TextArea placeholder="Content" rows={10} value={content} onChange={contentChange} id="content" />
                </div>
                <div className="button">
                    <Button type="primary" size="large" onClick={updatePost}>
                        Save Post
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UpdatePost;
