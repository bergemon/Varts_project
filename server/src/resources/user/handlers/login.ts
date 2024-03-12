import { Request, Response } from 'hyper-express'
import { response, res_type } from '@/utils/response'
import userServices from '@/resources/user/user.services'
import { compareWithHash } from '@/utils/hash_some'
import auth from '@/utils/auth'

// login
async function authenticate_user(req: Request, res: Response) 
{
    const { email, password } = await req.json()
    
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

        const { session_token, refresh_token } = auth.generateTokens(user.id, user.email)

        if (!session_token || !refresh_token)
        {
            return response(res, res_type.server_error, { error: 'Failed to generate tokens'})
        }

        // Set tokens into cookies
        res.cookie('_stk', session_token)
        res.cookie('_rtk', refresh_token)
        return response(res, res_type.ok, { message: "You've got a new pair of tokens" })
    }
    catch (error: any)
    {
        return response(res, res_type.server_error, { error: 'Some unknown error occured' })
    }
}

export default
{
    authenticate_user
}