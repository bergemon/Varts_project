import { Request, Response } from 'hyper-express'
import { response, res_type } from '@/utils/response'
import user_model from '../user.model'
import user_crud from '@/resources/user/user.crud'
import manager_crud from '@/resources/manager/manager.crud'

async function find_users_by_username(req: Request, res: Response): Promise<Response>
{
    const username_to_find = req.params.username

    const authorized_user_id = req.locals.auth?.id

    try
    {
        const authorized_user = await user_crud.get_user_by_id(authorized_user_id)
        const authorized_manager = await manager_crud.get_manager_by_id(authorized_user_id)

        if (!authorized_user && !authorized_manager)
        {
            return response(res, res_type.unauthorized, { error: "Can not find authorized user" })
        }

        const { query } = req
    
        if (Array.isArray(query.page) || Array.isArray(query.limit))
        {
            return response(res, res_type.bad_request,
                { error: "You must provide just one number in each query parameter" })
        }

        const page = query.page as string
        const limit = query.limit as string
        if (!page || !limit)
        {
            return response(res, res_type.bad_request, { error: "Queries page and limit is required" })
        }
        if (parseInt(page) < 1)
        {
            return response(res, res_type.bad_request, { error: "Page must be greater than zero" })
        }

        const found_users = await user_crud.find_users_by_username(
            username_to_find, parseInt(page), parseInt(limit)
        )

        if (!found_users)
        {
            return response(res, res_type.not_found,
                { message: "Did not found any users that contains provided username" })
        }

        const user_views = found_users.map(elem => user_model.user_view_partial(elem))

        return response(res, res_type.server_error, { found_users: user_views })
    }
    catch (error: any)
    {
        return response(res, res_type.server_error, { error: error })
    }
}

export default
{
    find_users_by_username
}