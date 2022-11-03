import express from 'express';
import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connect from './db/connect';
import helmet from 'helmet';



const port = config.get('PORT') as number;  // PORT number can be changed from config directory
const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

app.listen(port,()=>{

    console.log(`server running at http://localhost:${port}`);

    connect();  // making database connection


});
