/* ------------- Sets up the Express server, defines the root URL route and starts server via specified port -------------  */

const express = require('express') // imports express module and initializes the express variable to be able to use it

const app = express() // creates an web app instance with defined settings such as routes etc

const PORT = 3001 // sets the PORT variable for the backend (the react app runs on localhost 3000, backend will run on 3001)

// callback function for when the initial route is reached the required function returns this message via HTTP GET to "/" and back to the client
app.get('/', (req, res)=> {
    res.send('initial route is reached')
});

// starts server & listens to the specified port which in turn logs the message to the console
app.listen(PORT, ()=>{
    console.log(`listening to port ${PORT}`)
}); 
