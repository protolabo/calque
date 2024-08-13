import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
// Routes
import userRoute from './routes/user.route';
import projectRoute from './routes/project.route';

// Middleware
import responseLogger from './middleware/res_logger.middleware';

// Uncomment for HTTPS implementation (currently not used)
/*
import https from 'https';
import fs from 'fs';
import path from 'path';

const key = fs.readFileSync(path.join(__dirname, 'localhost+2-key.pem'), 'utf8');
const cert = fs.readFileSync(path.join(__dirname, 'localhost+2.pem'), 'utf8');

const server = https.createServer({ key: key, cert: cert }, app);
*/

//env variable for db url
dotenv.config();
// CORS options
const corsOptions = {
  origin: true, // Allow requests from all addresses for now
  optionsSuccessStatus: 200,
};

// Initialize Express app
const app: Application = express();

// Middleware setup
app.use(cors(corsOptions)); // Allow requests from every URL for now
app.use(bodyParser({ limit: '50mb' })); // Large payload limit
app.use(express.json()); // Parse JSON bodies for API requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(responseLogger); // Log response values in the console

// Route setup
app.use('/api/user', userRoute);
app.use('/api/project', projectRoute);

// Basic route
app.get('/', (req: Request, res: Response) => {
  console.log('Received a request with query:', req.query);
  res.send('Hello World!'); 
});

// MongoDB connection setup
mongoose.connect(process.env.DATABASE_URL as string);

const db = mongoose.connection;
db.on('error', (error) => console.error('Connection error:', error));
db.once('open', () => console.log('Connected to the Database.'));

// Export the app (connection with client will be handled elsewhere)
export default app;
