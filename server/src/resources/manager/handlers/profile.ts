import { Request, Response } from 'hyper-express'
import { response, res_type } from '@/utils/response'
import manager_crud from '../manager.crud'
import manager_model from '../manager.model'

// обновление профиля
async function manager_update_profile(req: Request, res: Response): Promise<Response>
{
    const authorized_manager_id = req.locals.auth?.id

    const { username, password, password_repeat, language } = await req.json()

    try {

        if (password !== password_repeat)
        {
            return response(res, res_type.bad_request,
                { error: "Repeated password does not match"})
        }

        const authorized_manager = await manager_crud.get_manager_by_id(authorized_manager_id)

        if (!authorized_manager)
        {
            return response(res, res_type.forbidden, { error: "Not authorized"})
        }

        const updated_manager = await manager_crud.update_manager(
            authorized_manager_id, username, password, language
        )

        if(!updated_manager)
        {
            return response(res, res_type.server_error,
                { error: "Can not update manager profile"})
        }

        return response(res, res_type.ok, manager_model.manager_view_full(updated_manager))
    }
    catch(error: any)
    {
        return response(res, res_type.server_error, { error: error })
    }
}

export default {
    manager_update_profile
}