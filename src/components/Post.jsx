import React, { useEffect, useState } from 'react'
import { Typography } from "antd";
import { Card } from "antd";
import db from '../firebaseConfig'
import { doc, getDoc } from "firebase/firestore";
import { useParams } from 'react-router-dom';
import "../App.css";

const { Title } = Typography;

const Post = ({ user }) => {

    const postId = useParams();
    
    const [title, setTitle] = useState('')

    const [content, setContent] = useState('')

    useEffect(() => {
        const path = user?.uid ? `users/${user?.uid}/posts` : "posts";

        const fetchedPost = async () => {
            const postRef = doc(db, path, postId.id);
            // retrieving single post from database
            const docSnap = await getDoc(postRef);

            if (docSnap.exists()) {
                let { content, title } = docSnap.data();
                setTitle(title);
                setContent(content);
            } else {
                // docSnap.data() will be undefined in this case
                alert("No such document!");
            }
        };
        fetchedPost();
    }, [postId.id, user?.uid]);
    

    return (
        <div className="post-container">
            <div className="title">
                <Title className='post-title'>{title}</Title>
            </div>
            <div className="articles">
                <Card style={{ marginTop: '20px' }}>
                    <p>{content}</p>
                </Card>
            </div>
        </div>
    );
}

export default Post