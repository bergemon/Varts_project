import { Router } from 'hyper-express';
import jsonChecker from './middleware/jsonChecker';
import userRouter from "./routes/user"

const router = new Router();

// router.use(jsonChecker);

router.use('/v1/user', userRouter);

router.get('/', (req, res) => res.json('Server lister'));

export default router;