import express from 'express'; // imports express framework to build web apps in Node.js
import mysql from 'mysql2'; // imports MySQL module for database interaction
import cors from 'cors'; // imports cors-module for cross-origin resource sharing to receive requests from different domains

// Initializes the id variable
let id = 1; 

const app = express(); // instance of express app
const PORT = 3001; // port number which the server listens for incoming requests
app.use(express.json()); // middleware to the Express application to parse JSON data in request bodies
app.use(cors()); //  middleware to the Express application to enable CORS

// Creates a connection to the MySQL database
const connection = mysql.createConnection({
    host: '[edited out, sensitive data]',
    user: '[edited out, sensitive data]',
    password: '[edited out, sensitive data]',
    port: '[edited out, sensitive data]',
    database: '[edited out, sensitive data]',
});

// Catches connection error
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// route handler; callback function for when the initial route is reached the required function returns this message via HTTP GET to "/" and back to the client
app.get('/', (req, res)=> {
    res.send('initial route is reached server.mjs')
    //res.json({ message: 'initial route is reached server.mjs' });

});

// Route handler for the URL /api/create executing a POST request with request body values inserted into database (also see react component DiaryEntry.tsx)
app.post('/api/create', (req, res) => {
    // values that are sent in the request body
    const title = req.body.title;
    const post = req.body.post;
    const date = req.body.date;
  
    // Inserts the request body values + id into database via a query
    const query = `INSERT INTO diaryentry (id, title, post, date) VALUES (?, ?, ?, ?)`;
    const values = [id, title, post, date];

    // catches query errors
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error('Error in executing MySQL query:', err);
        res.status(500).send('Error in executing MySQL query');
        return;
      }
  
      console.log('Query entry was added successfully');
      res.json({ message: 'Query entry was added successfully' });
      id++; // Increments the id after each post so it recieves a unique id
    });
  });
  
// Starts Express app and listens for incoming requests on the specified port in the PORT variable
app.listen(PORT, () => {
    console.log(`app.listen PORT () =>: Server is running on port ${PORT}`);
});