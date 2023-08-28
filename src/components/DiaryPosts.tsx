import React, { useState, useEffect } from 'react'
import '../css/DiaryPosts.css'
import axios from 'axios'
import { FaRegTrashAlt } from 'react-icons/fa';

// Provides the Post object with its wanted structure
interface Post {
    id: number;
    title: string;
    post: string;
    date: string;
}

export default function DiaryPosts() {
    const [posts, setPosts] = useState<Post[]>([]);

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

    return (
        <div className='titleContainer'>
            <h1 className='containerTitle'>My Diary Posts:</h1>
            <div className='PostContainer'>
                {posts.map((post) => (
                    <div key={post.id} className='Post'>
                        <div className='date'>{post.date} 
                            <div className='deletePost' onClick={() => handleDeletePost(post.id)}>
                                < FaRegTrashAlt />
                            </div>
                        </div>
                        <h2 className='title'>• {post.title} •</h2>
                        <p className='postContent'>{post.post}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
