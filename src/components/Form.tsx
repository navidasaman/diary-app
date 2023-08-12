import React, { useState } from 'react'
import '../css/Form.css'

function Form() {
    /*useState hooks to set initial values to the state variables to store the user input through setters*/ 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    
    /*This function prevents default submisson of the form, clears the form 
    and notifies user that their message has been sent upon pressing the submit button */ 
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setName('');
      setEmail('');
      setMessage('');
      alert(`Thank you for your message! we will get back to you as soon as possible!`);
      console.log(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`)
    };

    /*Returns the contact form*/ 
    return (
        <form method='post' /*action="mailto:removedemailforthisrepositoryprivacyreasons@email.com"*/ className="contactForm" onSubmit={handleSubmit}>
            <h1>Contact.</h1>
            <input type="text" name="name" id="name" placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} />
            <input type="email" name="email" id="email" placeholder='e-mail@email.com' onChange={(e) => setEmail(e.target.value)} value={email} required />
            <textarea
                name="message" 
                id="message"
                style={{ width: '100%', height: '150px' }}
                placeholder='Type your message here'
                required
                onChange={(e) => setMessage(e.target.value)} value={message} 
            ></textarea>            
            <button className="formButton" type='submit'>Contact us</button>
        </form>
    )
}

export default Form
