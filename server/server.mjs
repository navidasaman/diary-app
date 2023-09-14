import express from 'express'; // imports express framework to build web apps in Node.js
import mysql from 'mysql2'; // imports MySQL module for database interaction
import cors from 'cors'; // imports cors-module for cross-origin resource sharing to receive requests from different domains

// Initializes the id variable
let id = 1; 
let calendarID = 0;

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

//----------------------------- ENDPOINTS FOR DIARY ENTRIES -----------------------------//
// Route handler for the HTTP GET request at /api/get endpoint
app.get('[edited out, sensitive data]', (req, res) => {
    // Retrieves everything from the diaryentry table (to be able to showcase it, see component DiaryPosts.tsx)
    const query = "SELECT * FROM [edited out, sensitive data]";
    // Catches error
    connection.query(query, (err, result) => {
        if (err) {
            console.error('Following error found when executing MySQL query: ', err);
            res.status(500).send('Error in executing MySQL query');
            return;
        }
        res.json(result);
    });
});

// Route handler for the URL /api/create executing a POST request with request body values inserted into database (also see react component DiaryEntry.tsx)
app.post('[edited out, sensitive data]', (req, res) => {
    // values that are sent in the request body
    const title = req.body.title;
    const post = req.body.post;
    const date = req.body.date;

    // Inserts the request body values + id into database via a query
    const query = `INSERT INTO [edited out, sensitive data] `;
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

// Route handler for delete request at the specified endpoint with 
app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id; // rq.params  object contains the values of the route parameter wherein the id is retrieved
    const query = `DELETE FROM [edited out, sensitive data]`;
    const values = [id];
    //Cathes error
    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Error executing MySQL query');
            return;
        }
        console.log('Delete successful');
        res.json({ message: 'Delete successful' });
    });
});

// Route handler for PUT request at the specified endpoint for specific post with specific id
app.put('[edited out, sensitive data]', (req, res) => {
    // Extracts the id, updated title and updated post content from the request body
    const postId = req.params.id;
    const updatedTitle = req.body.title;
    const updatedContent = req.body.content;

    // if the post with the specific id exists the query updates the post
    if (postId) {
        const editQuery = 'UPDATE [edited out, sensitive data]?';
        const editValues = [updatedTitle, updatedContent, postId];
        // Query result handling
        connection.query(editQuery, editValues, (err, result) => {
            if (err) {
                console.error('Error in editing MySQL query:', err);
                res.status(500).send('Error in editing MySQL query');
                return;
            }
            console.log('Edit successful');
            res.json({ message: 'Edit successful' });
        });
    } else { // or else a new post will be made if the existing id does not exist to be updated
        const createQuery = '[edited out, sensitive data]';
        const createValues = [updatedTitle, updatedContent];

        connection.query(createQuery, createValues, (err, result) => {
            if (err) {
                console.error('Error in creating MySQL query:', err);
                res.status(500).send('Error in creating MySQL query');
                return;
            }
            console.log('Create successful');
            res.json({ message: 'Create successful' });
        });
    }
});

//----------------------------- ENDPOINTS FOR CALENDAR EVENTS -----------------------------//
// Create an API endpoint to retrieve all events
app.get('[edited out, sensitive data]', (req, res) => {
    const calendarEventsQuery = 'SELECT * FROM [edited out, sensitive data]';

    connection.query(calendarEventsQuery, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to retrieve events from the database' });
        } else {
            res.status(200).json(result);
        }
    });
});

// Inserts events
app.post('[edited out, sensitive data]', (req, res) => {
    // values that are sent in the request body
    calendarID++;

    const title = req.body.title;
    const start = req.body.start;
    const end = req.body.end;
    const description = req.body.description;
    console.log(req.body.description)

    // Inserts the request body values into the database via a query
    const calendarEventsQuery = `INSERT INTO [edited out, sensitive data]`;
    const values = [calendarID, title, start, end, description];

    // catches query errors
    connection.query(calendarEventsQuery, values, (err, result) => {
        if (err) {
            console.error('Error in executing MySQL query:', err);
            res.status(500).send('Error in executing MySQL query');
            return;
        }
        console.log('calendar event was added successfully:');
        res.json({ message: 'calendar event was added successfully' });
    });
});

// Delete events
app.delete('[edited out, sensitive data]', (req, res) => {
    const eID = req.params.eID;
    const calendarEventsQuery = `DELETE FROM calendarevents where id = ?`;
    const values = [eID];

    connection.query(calendarEventsQuery, values, (err, res) => {
        if(err){
            console.error(`Error deleting ${id} from db: ` + err);
            res.status(500).send('Error executing MySQL query');
            return;
        }
        console.log('Delete successful!');
    });

});

// Update events
app.put('[edited out, sensitive data]', (req, res) => {
    const editEventId = req.params.editEventId;
    const editTitle = req.body.title;
    const editDescription = req.body.description;

    const editStartDate = req.body.start ? new Date(req.body.start) : null;
    const editEndDate = req.body.end ? new Date(req.body.end) : null;
  
    let editStart = null;
    if (editStartDate) {
      const editStartDateMinusOneDay = new Date(editStartDate.setDate(editStartDate.getDate()));
      if (editStartDateMinusOneDay instanceof Date && !isNaN(editStartDateMinusOneDay)) {
        editStart = editStartDateMinusOneDay.toLocaleString().slice(0, 19).replace('T', ' ');
      }
    }
  
    const editEnd = editEndDate ? editEndDate.toLocaleString().slice(0, 19).replace('T', ' ') : null;
  
    const idString = editEventId.toString();
  
    const calendarEventsQuery ='UPDATE [edited out, sensitive data]';
    const editValues = [editTitle, editStart, editEnd, editDescription, idString];
  
    connection.query(calendarEventsQuery, editValues, (err, result) => {
      if (err) {
        console.error('Error in editing MySQL query:', err);
        res.status(500).send('Error in editing MySQL query');
        return;
      }
      console.log('Edit successful');
      res.json({ message: 'Edit successful' });
    });
  });

// Starts Express app and listens for incoming requests on the specified port in the PORT variable
app.listen(PORT, () => {
    console.log(`app.listen PORT () =>: Server is running on port ${PORT}`);
});