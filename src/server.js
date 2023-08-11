import express from 'express';
import dotenv from 'dotenv';
import router from './routes/indexRoute.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(router);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Application running on port ${port}.`));