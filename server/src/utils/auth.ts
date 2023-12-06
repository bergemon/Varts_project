import jwt from 'jsonwebtoken'
import { UUID } from 'crypto';
import { User } from '@prisma/client';


function createUserAccessToken(user: User) {
    if (!process.env.JWT_ACCESS_SECRET) throw new Error('JWT missing')
    const token = { user: { email: user.email, id: user.id } }
    const jwtToken = jwt.sign(token, process.env.JWT_ACCESS_SECRET, { expiresIn: '30s' })
    return jwtToken
}

function createUserRefreshToken(user: User, jti: UUID) {
    if (!process.env.JWT_REFRESH_SECRET) throw new Error('JWT missing')
    const token = { user: { id: user.id, jti } }
    const jwtToken = jwt.sign(token, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
    return jwtToken
}

function generateTokens(user: User, jti: UUID) {
    const accessToken = createUserAccessToken(user);
    const refreshToken = createUserRefreshToken(user, jti);
    return {
        accessToken,
        refreshToken
    }
}

function validateRefreshToken(token: string) {
    try {
        if (!process.env.JWT_REFRESH_SECRET) throw new Error('JWT missing')
        const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        if (typeof userData === 'object' && userData !== null) {
            return userData.user;
        }
    } catch (e) {
        return null;
    }
}

export default {
    createUserAccessToken,
    createUserRefreshToken,
    generateTokens,
    validateRefreshToken
}