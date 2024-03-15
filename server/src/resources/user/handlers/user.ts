import { Request, Response } from 'hyper-express'
import { response, res_type } from '@/utils/response'
import user_model from '../user.model'
import user_crud from '@/resources/user/user.crud'

// информация о пользователе
async function get_user(req: Request, res: Response) 
{
    const id = req.locals.auth?.id

    try
    {
        // Get current user
        const user = await user_crud.get_user(id)

        if (!user)
        {
            return response(res, res_type.unauthorized, { error: 'User is not authorized' })
        }

        const res_body = user_model.get(user)

        return response(res, res_type.ok, res_body)
    }
    catch (error: any)
    {
        return res.status(res_type.server_error).json({ error: error })
    }
}

export default
{
    get_user
}