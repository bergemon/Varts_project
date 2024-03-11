import jwt from 'jsonwebtoken'
import { UUID } from 'crypto'
// import { User } from '@prisma/client'

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'defaultSecret'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'defaultSecret'

interface Payload
{
    id: string
    email: string
    jti?: UUID // Добавлено свойство jti с опциональным типом
}
   

function createToken(payload: Payload, secret: string, expiresIn: string): string
{
    if (!secret) { throw new Error('JWT secret is missing') }
    return jwt.sign(payload, secret, { expiresIn })
}

function verifyToken(token: string, secret: string): Payload | null
{
    if (!secret) { throw new Error('JWT secret is missing') }

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

function generateTokens(entity: Payload, jti: UUID): { accessToken: string; refreshToken: string }
{
    const accessToken = createToken({ id: entity.id, email: entity.email }, JWT_ACCESS_SECRET, '1d')
    const refreshToken = createToken({ id: entity.id, email: entity.email, jti }, JWT_REFRESH_SECRET, '30d')
    return { accessToken, refreshToken }
}

function validateRefreshToken(token: string): Payload | null
{
    const decoded = verifyToken(token, JWT_REFRESH_SECRET)
    return decoded
}

export default
{
    generateTokens,
    validateRefreshToken
}