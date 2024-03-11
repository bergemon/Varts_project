import { Request, Response, MiddlewareNext } from 'hyper-express';

export default async function jsonChecker(
    req: Request,
    res: Response,
    next: MiddlewareNext
)
{
    if (req.headers['content-type'] === 'application/json')
    {
        try
        {
            req.body = await req.json()
            next()
        }
        catch (err)
        {
            return res.status(400).json({ error: 'Bad Request', message: 'Invalid JSON' })
        }
    }
    else
    {
        return res.status(400).json({ error: 'Bad Request', message: 'Invalid JSON' })
    }
}