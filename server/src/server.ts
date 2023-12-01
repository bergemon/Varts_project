import * as HyperExpress from 'hyper-express';
import * as dotenv from "dotenv";

dotenv.config({ path: '../.env' })

const port = process.env.PORT ? parseInt(process.env.PORT) : 5000

const server = new HyperExpress.Server();
const router = new HyperExpress.Router();

router.get('/', (req, res) => res.json('Server lister'));

server.use(router);
server.listen(port)
.then(() => console.log(`Server started on port ${port}`))
.catch((error) => console.log('Failed to start server:', error));