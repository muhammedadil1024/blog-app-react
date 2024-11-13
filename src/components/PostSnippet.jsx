import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import db from "../firebaseConfig";
import "../App.css";
import toast, { Toaster } from "react-hot-toast";

const PostSnippet = ({ id, title, content, user, authorId }) => {
    const onDeletePost = async () => {
        try {
            const userId = user?.uid;
            if (userId) {
                const userPostRef = doc(db, "users", userId, "posts", id);
                const userPostSnap = await getDoc(userPostRef);

                if (userPostSnap.exists()) {
                    const linkedId = userPostSnap.data().linkedId;
                    if (linkedId) {
                        const batch = writeBatch(db);

                        // deleting post from user collection
                        batch.delete(userPostRef);

                        // deleting post from top level collection
                        const topPostRef = doc(db, "posts", linkedId);
                        batch.delete(topPostRef);

                        // // Commit both deletion, batch operation
                        await batch.commit();
                        toast.success("Post deleted successfully!");
                    } else {
                        console.error("Linked document ID not found!");
                    }
                } else {
                    console.error("Main document not found!");
                }
            } else {
                console.error("Unauthenticated User");
            }
        } catch (e) {
            toast.error("Error deleting document ", e.message);
        }
    };

    const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <div className="post-container">
            <Toaster />
            <div className="article">
                <Card
                    style={{ marginTop: 16 }}
                    type="inner"
                    title={capitalizeFirst(title)}
                    extra={
                        <div className="post-links">
                            <Link className="post-link" to={`post/${id}`}>
                                Read Full Article
                            </Link>
                            {user && user.uid === authorId && (
                                <div className="post-modification">
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
};

export default PostSnippet;

// Below this old PostSnippet Card is only deleting from "users" collection, above code is deleting from  both colections

// import React from 'react'
// import { Link } from "react-router-dom";
// import { Card } from "antd";
// import { doc, deleteDoc } from "firebase/firestore";
// import db from '../firebaseConfig';
// import "../App.css";

// const PostSnippet = ({ id, title, content, user }) => {

//     // const capitalizeFirst = str => {
//     //     return str.charAt(0).toUpperCase() + str.slice(1);
//     // }
//     // capitalizeFirst(title);

//     const onDeletePost = async () => {

//         await deleteDoc(doc(db, "users",user.uid, "posts", id));
//         alert('post deleted', id);
//     }

//     return (
//         <div className="post-container">
//             <div className="article">
//                 <Card
//                     style={{
//                         marginTop: 16,
//                     }}
//                     type="inner"
//                     title={title}
//                     extra={
//                         <div className="post-links">
//                             <Link className="post-link" to={`post/${id}`}>
//                                 Read Full Article
//                             </Link>
//                             {user && (
//                                 <div className='post-modification'>
//                                     <Link className="post-link" to={`update-post/${id}`}>
//                                         Edit
//                                     </Link>
//                                     <Link onClick={onDeletePost} className="post-link">
//                                         Delete
//                                     </Link>
//                                 </div>
//                             )}
//                         </div>
//                     }
//                 >
//                     <p>{content}</p>
//                 </Card>
//             </div>
//         </div>
//     );
// }

// export default PostSnippet
