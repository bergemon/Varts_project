import { Request, Response } from "hyper-express"
import { res_type } from '@/utils/response'
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import auth from '@/utils/auth'

dotenv.config({ path: '../.env' })

if (!process.env.JWT_ACCESS_SECRET)
{
    throw new Error("JWT_SECRET missing in environment.")
}

function get_tokens_from_request_header(req: Request): any
{
    const session_token = req.cookies["_stk"]
    const refresh_token = req.cookies["_rtk"]

    return [session_token, refresh_token]
}

export const authorization = (req: Request, res: Response, next: Function) =>
{
    const [stk, rtk] = get_tokens_from_request_header(req)

    if (rtk === undefined)
    {
        return res
            .status(res_type.forbidden)
            .json({ error: "You didn't provide refresh token" })
    }

    const decoded_stk = stk !== undefined ? auth.validate_stk(stk) : null

    if (decoded_stk === null)
    {
        const decoded_rtk = auth.validate_rtk(rtk)

        if (decoded_rtk !== null)
        {
            req.locals.auth = decoded_rtk

            const { session_token, refresh_token } = auth.generateTokens(decoded_rtk.id, decoded_rtk.email)

            // Set tokens into cookies
            res.cookie('_stk', session_token)
            res.cookie('_rtk', refresh_token)

            next()
        }
        else
        {
            return res
                .status(res_type.forbidden)
                .json({ error: "Not authenticated" })
        }
    }
    else
    {
        req.locals.auth = decoded_stk
        next()
    }
}

export const optionalAuthenticate = (req: Request, res: Response, next: Function) =>
{
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