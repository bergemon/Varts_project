import { Request, Response } from "hyper-express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config({ path: '../.env' })

if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error("JWT_SECRET missing in environment.")
}

function getTokenInHeader(req: Request) {
    const authorization = req.headers.authorization

    if (!authorization)
    {
        return
    }

    if (authorization.split("=").length != 2)
    {
        return
    }
    
    const [tag, token] = authorization.split("=")
    if (tag === "Token" || tag === "Bearer")
    {
        return token
    }

    return
}

export const authenticate = (req: Request, res: Response, next: Function) => {
    const token = getTokenInHeader(req)
    if (!token)
    {
        return res.status(401).json({ error: 'No token provided.' })
    }
  
    jwt.verify(token, process.env.JWT_ACCESS_SECRET!, (err, decoded) => {
        if (err)
        {
            return res.status(500).json({ error: 'Failed to authenticate token.' })
        }
        req.locals.auth = decoded
        next()
    })
}

export const optionalAuthenticate = (req: Request, res: Response, next: Function) => {
    const token = getTokenInHeader(req)

    if (!token) {
        next()
        return
    }

    jwt.verify(token, process.env.JWT_ACCESS_SECRET!, (err, decoded) => {
        if (err) {
            next()
            return
        }
        req.locals.auth = decoded
        next()
    })
}