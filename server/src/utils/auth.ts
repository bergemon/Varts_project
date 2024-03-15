import jwt from 'jsonwebtoken'

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'defaultSecret'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'defaultSecret'

interface Payload
{
    id: string
    email: string
    expires: number
}

function createToken(payload: Payload, secret: string): string
{
    if (!secret)
    {
        throw new Error('JWT secret is missing')
    }
    return jwt.sign(payload, secret)
}

function verify_token(token: string, secret: string): Payload | null
{
    if (!secret)
    {
        throw new Error('JWT secret is missing')
    }

    try
    {
        return jwt.verify(token, secret) as Payload
    }
    catch (exception)
    {
        console.log(exception)
        return null
    }
}

function validate_stk(token: string): Payload | null
{
    const decoded = verify_token(token, JWT_ACCESS_SECRET)

    if (decoded !== null)
    {
        return decoded.expires > new Date().getTime()
            ? decoded
            : null
    }

    return null
}

function validate_rtk(token: string): Payload | null 
{
    const decoded = verify_token(token, JWT_REFRESH_SECRET)

    if (decoded !== null)
    {
        return decoded.expires > new Date().getTime()
            ? decoded
            : null
    }

    return null
}

function generateTokens(user_id: string, user_email: string)
    : { session_token: string; refresh_token: string }
{
    const current_time = new Date().getTime()
    const minute = 6e4
    const day = 864e5

    const stk_expiration = current_time + minute * 10
    const rtk_expiration = current_time + day * 90

    const session_token = createToken(
        { id: user_id, email: user_email, expires: stk_expiration },
        JWT_ACCESS_SECRET
    )
    const refresh_token = createToken(
        { id: user_id, email: user_email, expires: rtk_expiration },
        JWT_REFRESH_SECRET
    )
    return { session_token, refresh_token }
}

export default
{
    validate_stk,
    validate_rtk,
    generateTokens
}