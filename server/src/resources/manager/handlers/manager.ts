import { Request, Response } from 'hyper-express'
import { response, res_type } from '@/utils/response'
import { get_manager_view_by_rights } from '../utils/return_view'
import manager_crud from '../manager.crud'
import manager_model from '../manager.model'

async function get_manager_authorized(req: Request, res: Response): Promise<Response>
{
    const authorized_manager_id = req.locals.auth?.id

    try
    {
        const authorized_manager = await manager_crud.get_manager_by_id(authorized_manager_id)
        if (!authorized_manager)
        {
            return response(res, res_type.server_error, { error: "Can't find current manager in database" })
        }

        // Get full model of the requested manager
        return response(res, res_type.ok,
            { requested_manager: manager_model.manager_view_full(authorized_manager) })
    }
    catch (error: any)
    {
        return response(res, res_type.server_error, { error: error })
    }
}

async function get_other_manager(req: Request, res: Response): Promise<Response>
{
    const authorized_manager_id = req.locals.auth?.id

    const desired_manager_id = req.params.id

    try
    {
        const authorized_manager = await manager_crud.get_manager_by_id(authorized_manager_id)
        if (!authorized_manager)
        {
            return response(res, res_type.forbidden, { error: "Prohibited route" })
        }

        const found_manager = await manager_crud.get_manager_by_id(desired_manager_id)
        if (!found_manager)
        {
            return response(res, res_type.not_found, { error: "Can't find desired manager in database" })
        }

        const authorized_manager_role = authorized_manager.role
        const requested_manager_role = found_manager.role

        const manager_view = get_manager_view_by_rights(
            authorized_manager_role,
            requested_manager_role,
            found_manager
        )

        return response(res, res_type.ok, { requested_manager: manager_view })
    }
    catch (error: any)
    {
        return response(res, res_type.server_error, { error: error })
    }
}

export default {
    get_manager_authorized,
    get_other_manager
}