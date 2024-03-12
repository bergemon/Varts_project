import { Request, Response } from "hyper-express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config({ path: '../.env' })

if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error("JWT_SECRET missing in environment.")
}

function get_tokens_from_request_header(req: Request): any {
    const session_token = req.cookies["_stk"]
    const refresh_token = req.cookies["_rtk"]

    return [session_token, refresh_token]
}

export const authenticate = (req: Request, res: Response, next: Function) => {
    const [session_token, refresh_token] = get_tokens_from_request_header(req)

    if (!session_token)
    {
        return res.status(401).json({ error: 'No token provided.' })
    }
  
    jwt.verify(session_token, process.env.JWT_ACCESS_SECRET!, (err: any, decoded: any) => {
        if (err)
        {
            return res.status(500).json({ error: 'Failed to authenticate token.' })
        }
        req.locals.auth = decoded
        next()
    })
}

export const optionalAuthenticate = (req: Request, res: Response, next: Function) => {
    const [session_token, refresh_token] = get_tokens_from_request_header(req)

    if (!session_token) {
        next()
        return
    }

    jwt.verify(session_token, process.env.JWT_ACCESS_SECRET!, (err: any, decoded: any) => {
        if (err) {
            next()
            return
        }
        req.locals.auth = decoded
        next()
    })
}