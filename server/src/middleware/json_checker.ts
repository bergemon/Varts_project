import { Request, Response, MiddlewareNext } from 'hyper-express'
import { res_type } from '@/utils/response'

export const json_checker = async(req: Request, res: Response, next: Function) =>
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
            return res
                .status(res_type.bad_request)
                .header("Content-Type", "application/json")
                .send(JSON.stringify({ error: 'Bad Request', message: 'Invalid JSON' }))
        }
    }
    else
    {
        return res
            .status(res_type.bad_request)
            .header("Content-Type", "application/json")
            .send(JSON.stringify({ error: 'Bad Request', message: 'Invalid JSON' }))
    }
}