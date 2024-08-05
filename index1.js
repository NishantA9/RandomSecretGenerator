// HINTS: 
// 1. Import express and axios
import express from 'express';
import axios from 'axios';
import path from 'path';

// 2. Create an express app and set the port number.
const app = express();
const port = 3000;

// 3. Use the public folder for static files.
app.use(express.static("."));

// 4. Set the views directory to the root directory
app.set('views', path.resolve());
app.set('view engine', 'ejs');

// 5. When the user goes to the home page it should render the index.ejs file.
// 6. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.
app.get('/', async (req, res) => {
    try {
        const result = await axios.get("https://secrets-api.appbrewery.com/random");
        res.render('index', {
            secret: result.data.secret,
            user: result.data.username,
        });
    } catch (error) {
        console.log(error.response.data);
        res.status(500).send("Internal Server Error");
    }
});

// 7. Listen on your predefined port and start the server.
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
