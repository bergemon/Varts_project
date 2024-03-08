import 'module-alias/register';
import * as HyperExpress from 'hyper-express';
import * as dotenv from "dotenv";
import Router from './app';
import cors from 'cors';
import LiveDirectory from 'live-directory';

dotenv.config({ path: '../.env' })

const port = process.env.PORT ? parseInt(process.env.PORT) : 5000

const server = new HyperExpress.Server();

server.use(cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

const LiveAssets = new LiveDirectory('./src/public/files/images', {
    cache: {
        max_file_count: 250,
        max_file_size: 1024 * 1024
    },
});

server.get('/static/*', (request, response) => {
    const path = request.path.replace('/static', '');
    const file = LiveAssets.get(path);
    
    if (file === undefined) return response.status(404).send();

    const fileParts = file.path.split(".");
    const extension = fileParts[fileParts.length - 1];

    const content = file.content;
    if (content instanceof Buffer) {
        return response.type(extension).send(content);
    } else {
        return response.type(extension).stream(content);
    }
});

server.use(Router);
server.listen(port)
    .then(() => console.log(`Server started on port ${port}`))
    .catch((error) => console.log('Failed to start server:', error));