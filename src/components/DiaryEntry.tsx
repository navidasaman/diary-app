import React, { useState, useEffect } from 'react';
import '../css/Diary.css'
import axios from 'axios'; // To be able to make HTTP requests

export default function DiaryEntry() {
  // State management variables with empty strings which will be modified and updated
  const [title, setTitle] = useState('');
  const [post, setPost] = useState('');
  const [date, setDate] =  useState('');
  
  // Sets the date and time of submission
  useEffect(() =>{
    setDate(new Date().toLocaleString());
  }, []);

  const handleSubmit = () => {
     // Sends a post request to the specified URL
    axios.post('http://localhost:3001/api/create', 
    { // request body:
      title: title,
      post: post,
      date: date
    }) // Promise which only executes after the post request has been successfully made
      .then(() => {
        // Reset form fields after successful submission
        setTitle('');
        setPost('');
        setDate(new Date().toLocaleString());
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='textEditor'>
          <h1 className="diaryDesc">Diary.</h1>
          <input type="text" 
              className='diaryTitleInput'
              placeholder='Diary title'
              onChange={(e) => setTitle(e.target.value)}>
          </input>
          <textarea 
              className="writingSpace" 
              placeholder='Write your thoughts here'
              onChange={(e) => setPost(e.target.value)}>
          </textarea>
          <button className='submitButton' type="submit">Submit</button>   
      </div>
    </form>
);
}