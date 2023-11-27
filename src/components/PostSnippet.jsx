import React from 'react'
import { Link } from "react-router-dom";
import { Card } from "antd";
import { doc, deleteDoc } from "firebase/firestore";
import db from '../firebaseConfig';
import "../App.css";

const PostSnippet = ({ id, title, content, user }) => {

    // const capitalizeFirst = str => {
    //     return str.charAt(0).toUpperCase() + str.slice(1);
    // }
    // capitalizeFirst(title);

    const onDeletePost = async () => {

        await deleteDoc(doc(db, "users",user.uid, "posts", id));
        console.log('post deleted', id);
    }

    return (
        <div className="post-container">
            <div className="article">
                <Card
                    style={{
                        marginTop: 16,
                    }}
                    type="inner"
                    title={title}
                    extra={
                        <div className="post-links">
                            <Link className="post-link" to={`post/${id}`}>
                                Read Full Article
                            </Link>
                            {user && (
                                <div className='post-modification'>
                                    <Link className="post-link" to={`update-post/${id}`}>
                                        Edit
                                    </Link>
                                    <Link onClick={onDeletePost} className="post-link">
                                        Delete
                                    </Link>
                                </div>
                            )}
                        </div>
                    }
                >
                    <p>{content}</p>
                </Card>
            </div>
        </div>
    );
}

export default PostSnippet