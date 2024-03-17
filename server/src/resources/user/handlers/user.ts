import { Request, Response } from 'hyper-express'
import { response, res_type } from '@/utils/response'
import user_model from '../user.model'
import user_crud from '@/resources/user/user.crud'
import manager_crud from '@/resources/manager/manager.crud'
import user_utils from '@/resources/user/utils/is_friend'

async function get_user(req: Request, res: Response): Promise<Response>
{
    const authorized_user_id = req.locals.auth?.id

    try
    {
        const authorized_user = await user_crud.get_user_by_id(authorized_user_id)

        if (!authorized_user)
        {
            return response(res, res_type.unauthorized, { error: 'User is not authorized' })
        }

        return response(res, res_type.ok, { user: user_model.user_view_default(authorized_user) })
    }
    catch (error: any)
    {
        return response(res, res_type.server_error, { error: error })
    }
}

enum Status {
    user = "user",
    manager = "manager"
}

async function get_user_by_id(req: Request, res: Response): Promise<Response>
{
    const authorized_id = req.locals.auth?.id

    const requested_user_id = req.params.id

    try
    {
        const authorized_user = await user_crud.get_user_by_id(authorized_id)

        const authorized_manager = await manager_crud.get_manager_by_id(authorized_id)

        if (!authorized_user && !authorized_manager)
        {
            return response(res, res_type.server_error,
                { error: "Something got wrong, you have been authorized but server can't find such user or manager" })
        }

        const status: Status | null = authorized_user
            ? Status.user
            : authorized_manager
            ? Status.manager
            : null

        if (!status)
        {
            return response(res, res_type.server_error,
                { error: "Server can not get status of the authorized person" })
        }

        const requested_user = await user_crud.get_user_by_id(requested_user_id)

        if (!requested_user)
        {
            return response(res, res_type.not_found,
                { error: "Can not find requested user" })
        }

        const is_friend: boolean = await user_utils.is_friend(authorized_id, requested_user_id)

        if (status === Status.manager)
        {
            return response(res, res_type.ok, { requested_user: user_model.user_view_full(requested_user) })
        }
        if (is_friend)
        {
            return response(res, res_type.ok, { requested_user: user_model.user_view_default(requested_user) })
        }

        return response(res, res_type.ok, { requested_user: user_model.user_view_partial(requested_user) })
    }
    catch (error: any)
    {
        return response(res, res_type.server_error, { error: error })
    }
}

export default
{
    get_user,
    get_user_by_id
}