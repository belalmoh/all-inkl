import express from 'express';
import { QueryRouter } from './routes';
import Database from './libs/database';
import cors from 'cors';

// Initializing the app using express.js (web app framework)
const app = express();

// reading the port number from the passed .env from the cmd
const PORT = process.env.PORT_NUMBER;

// creating the db singleton object
const db = new Database();

/**
 * app.use => middleware configuration
 * 
 * using json and cors middlewares
 * 
 * json -> to easily parse sending/receviing json through the nodejs server
 * cors -> to allow cross origin
 */
app.use(express.json());
app.use(cors());

/**
 * Passing the database singleton instance through the middleware so it will be accessible through all routes
 */
app.use((req, res, next) => {
	req.dbInstance = db;
	next();
});

/**
 * using (GET) / just for the purpose of making sure the server is running properly
 */
app.get('/', (req, res) => {
  	res.send('Server is running!');
});

/**
 * configuring the endpoint /query using the middleware syntax - instead of adding all routes in here - better for separation of concerns
 */
app.use('/query', QueryRouter);


/**
 * running the server on the configured port
 */
app.listen(PORT, () => {
  	console.log(`Server is running on port ${PORT}`);
});
