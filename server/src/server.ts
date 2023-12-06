import 'module-alias/register';
import * as HyperExpress from 'hyper-express';
import * as dotenv from "dotenv";
import Router from './app';
import cors from 'cors';

dotenv.config({ path: '../.env' })

const port = process.env.PORT ? parseInt(process.env.PORT) : 5000

const server = new HyperExpress.Server();

server.use(cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));


server.use(Router);
server.listen(port)
    .then(() => console.log(`Server started on port ${port}`))
    .catch((error) => console.log('Failed to start server:', error));