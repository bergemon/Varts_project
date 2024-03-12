import { Request, Response } from 'hyper-express'
import { response, res_type } from '@/utils/response'
import userServices from '@/resources/user/user.services'
import { compareWithHash } from '@/utils/hash_some'
import auth from '@/utils/auth'
import { randomUUID } from 'crypto'
import { userModel } from './user.model'
import walletServices from '../wallet/wallet.services'

// create profile
async function userCreateProfile(req: Request, res: Response)
{
    const id = req.locals.auth?.id
    const { user_name, birth_date, language } = await req.json()

    try
    {
        const user = await userServices.get_user(id)

        if (!user)
        {
            return response(res, res_type.not_found, { error: 'User not auth'})
        }

        const createProfile = await userServices.userCreateUserNamePrisma(
            user.id, user_name, birth_date, language
        )

        if (!createProfile)
        {
            return response(res, res_type.server_error, { error: 'Profile create failed' })
        }

        const jti = randomUUID()

        const { accessToken, refreshToken } = auth.generateTokens(createProfile, jti)

        if (!accessToken || !refreshToken)
        {
            return response(res, res_type.server_error, { error: 'Failed to generate tokens' })
        }

        // проверка на существование кошелька
        const walletGet = await walletServices.walletGetPrisma(createProfile.id)

        if(!walletGet)
        {
            // создание нового кошелька
            await walletServices.walletCreatePrisma(createProfile.id)
        }

        const userView = userModel(createProfile)

        res.cookie('_refreshToken', refreshToken)
        return response(res, res_type.ok, { access: accessToken, user: userView })
    }
    catch (error: any)
    {
        return response(res, res_type.server_error, { error: 'Some unknown error occured' })
    }
}

// login
async function userLogin(req: Request, res: Response) 
{
    const { email, password } = await req.json();
    try {
        if(!email || !password)
        {
            return response(res, res_type.server_error, { error: 'Please write email and password' })
        }

        const user = await userServices.userEmailPrisma(email)

        if (!user)
        {
            return response(res, res_type.not_found, { error: 'User not found' })
        }

        if (!compareWithHash(password, user.password))
        {
            return response(res, res_type.forbidden, { error: 'Wrong password' })
        }

        const jti = randomUUID()

        const { accessToken, refreshToken } = auth.generateTokens(user, jti)

        if (!accessToken || !refreshToken)
        {
            return response(res, res_type.server_error, { error: 'Failed to generate tokens'})
        }

        const userView = userModel(user)

        res.cookie('_refreshToken', refreshToken)

        if (!user.username)
        {
            return response(res, res_type.ok, { error: 'Failed to generate tokens' })
        }

        return response(res, res_type.ok, { access: accessToken, user: userView })
    }
    catch (error: any)
    {
        return response(res, res_type.server_error, { error: 'Some unknown error occured' })
    }
}

// информация о пользователе
async function userGet(req: Request, res: Response) 
{
    const id = req.locals.auth?.id;
    try
    {
        // Get current user
        const currentUser = await userServices.get_user(id)

        if (!currentUser)
        {
            return response(res, res_type.unauthorized, { error: 'User is not authorized' })
        }

        const res_body = userModel(currentUser)

        return response(res, res_type.ok, res_body)
    }
    catch (error: any)
    {
        return response(res, res_type.server_error, { error: 'Some unknown error occured' })
    }
}

// обновление профиля
async function userUpdateProfile(req: Request, res: Response)
{
    const id = req.locals.auth?.id;
    const { userName, birthDay, language } = await req.json()
    try
    {
        const currentUser = await userServices.get_user(id)

        if(!currentUser)
        {
            return response(res, res_type.unauthorized, { error: 'User is not authorized' })
        }

        const updateUser = await userServices.userUpdateProfilePrisma(
            id, userName, birthDay, language
        )

        if(!updateUser)
        {
            return response(res, res_type.server_error, { error: 'User failed update information' })
        }

        return response(res, res_type.ok, userModel(updateUser))
    }
    catch(error: any)
    {
        return response(res, res_type.server_error, { error: 'Some unknown error occured' })
    }
}

export default
{
    userLogin,
    userGet,
    userCreateProfile,
    userUpdateProfile
}