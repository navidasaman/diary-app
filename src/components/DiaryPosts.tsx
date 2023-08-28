import React, { useState, useEffect } from 'react'
import '../css/DiaryPosts.css'
import axios from 'axios'

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

    return (
        <div className='titleContainer'>
            <h1 className='containerTitle'>My Diary Posts:</h1>
            <div className='PostContainer'>
                {posts.map((post) => (
                    <div key={post.id} className='Post'>
                        <p className='date'>{post.date}</p>
                        <h2 className='title'>• {post.title} •</h2>
                        <p className='postContent'>{post.post}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
