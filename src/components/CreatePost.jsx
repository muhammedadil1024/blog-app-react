import React, { useState } from 'react'
import "../App.css";
import { Typography, Input, Button } from "antd";
import { collection, addDoc } from "firebase/firestore"; 
import db from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { TextArea } = Input;

const CreatePost = (props) => {

    const navigate = useNavigate();

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const titleChange = (event) => setTitle(event.target.value) 
    const contentChange = (event) => setContent(event.target.value)
    
    const createPost = async () => {
        
      const docRef = await addDoc(collection(db, "users", props.user.uid, "posts"), {
          title,
          content
      });
      console.log("Document written with ID: ", docRef.id);
        // let load = {title, content}
        // console.log(load);

      setTitle('');
      setContent('');
      navigate('/');

    }

    return (
        <div className="createp-container">
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
                    <Button type="primary" size="large" onClick={createPost}>
                        Create Post
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CreatePost