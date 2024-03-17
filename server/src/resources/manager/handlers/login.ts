import { Request, Response } from 'hyper-express'
import { response, res_type } from '@/utils/response'
import { compare_passwords } from '@/utils/hash_some'
import auth from '@/utils/auth'
import manager_crud from '../manager.crud'

async function authenticate_manager(req: Request, res: Response): Promise<Response>
{
    const { email, password } = await req.json()

    try
    {
        if (!email || !password)
        {
            return response(res, res_type.server_error,
                { error: "Please put email and password fields into JSON" })
        }

        const manager = await manager_crud.get_manager_by_email(email)

        // Compare the written password and the other one stored in database
        if (!manager || !compare_passwords(password, manager.password))
        {
            return response(res, res_type.not_found, { error: "Wrong password or email" })
        }

        // Get new pair of tokens
        const { session_token, refresh_token } = auth.generateTokens(manager.id, manager.email)

        if (!session_token || !refresh_token)
        {
            return response(res, res_type.server_error, { error: "Failed to generate tokens" })
        }

        // Set tokens into cookies
        res.cookie('_stk', session_token)
        res.cookie('_rtk', refresh_token)

        return response(res, res_type.ok, { message: "You've got a new pair of tokens" })
    }
    catch (error: any)
    {
        return response(res, res_type.server_error, { error: error })
    }
}

export default
{
    authenticate_manager
}