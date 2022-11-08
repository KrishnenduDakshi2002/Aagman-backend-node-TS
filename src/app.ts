import express from 'express';
import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import connect from './db/connect';
import helmet from 'helmet';

//importing routers
import router from './routes/router';


const hostname = config.get('HOSTNAME') as string;
const port = config.get('PORT') as number;  // PORT number can be changed from config directory
const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

app.use(router);


const server = http.createServer(app);
server.listen(port,hostname,()=>{
    console.log(`server running at http://${hostname}:${port}`);
    connect();  // making database connection
});
