import React, { useState, useEffect } from 'react'
import '../css/DiaryPosts.css'
import axios from 'axios'
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';

// Provides the Post object with its wanted structure
interface Post {
    id: number;
    title: string;
    post: string;
    date: string;
}

export default function DiaryPosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [editPostId, setEditPostId] = useState(0);

    // Fetch data through HTTP GET request to the specified endpoint
    useEffect(() => {
        axios.get('http://localhost:3001/api/get')
            .then((response) => {
                setPosts(response.data)
            })
    });

    // Sends a delete request for a post with specified id
    const handleDeletePost = (id: number) => {
        axios.delete(`http://localhost:3001/api/delete/${id}`)
            .then(() => {
                // Deleted post is removed by filtering it out
                setPosts(posts.filter((post) => post.id !== id));
            })
            .catch((error) => {
                console.error('Error deleting post:', error);
            });
    };

    const handleEditPost = (id: number, title: string, content: string) => {
        setEditPostId(id);
        setEditTitle(title);
        setEditContent(content);
        setShowModal(true);
    };

    // Sends a PUT request to specified endpoint to update values
    const handleSaveEdit = () => {
        axios.put(`http://localhost:3001/api/edit/${editPostId}`, {
            title: editTitle,
            content: editContent,
        })
            .then(() => { // if above promise is resolved a new array updatedPosts uses map to edit the post according to the id
                const updatedPosts = posts.map((post) => {
                    if (post.id === editPostId) {
                        return { ...post, title: editTitle, post: editContent }; // a new object is returned with updated values
                    }
                    return post;
                });
                setPosts(updatedPosts);
                setShowModal(false);
            })
            .catch((error) => {
                console.error('Error updating post:', error);
            });
    };

    // To close the modal/popup box when pressing cancel button
    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className='titleContainer'>
            <h1 className='containerTitle'>My Diary Posts:</h1>
            <div className='postContainer'>
                {posts.map((post) => (
                    <div key={post.id} className='post'>
                        <div className='date'>{post.date}
                            <div className='editPost'>
                                < FaEdit onClick={() => handleEditPost(post.id, post.title, post.post)} />
                            </div>
                            <div className='deletePost' onClick={() => handleDeletePost(post.id)}>
                                < FaRegTrashAlt />
                            </div>
                        </div>
                        <h2 className='title'>• {post.title} •</h2>
                        <p className='postContent'>{post.post}</p>
                    </div>
                ))}
            </div>
            {showModal && (
                <div className="overlay">
                    <div className="modal">
                        <h2>Edit Post.</h2>
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                        ></textarea>
                        <button onClick={handleSaveEdit}>Save</button>
                        <button onClick={handleCloseModal}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}
