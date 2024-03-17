import { Request, Response } from 'hyper-express'
import { response, res_type } from '@/utils/response'
import { rights_to_create_manager } from '../utils/check_role'
import manager_crud from '../manager.crud'
import manager_model from '../manager.model'

async function delete_manager_by_id(req: Request, res: Response): Promise<Response>
{
    const authorized_manager_id = req.locals.auth?.id

    const manager_to_delete_id = req.params.id

    try
    {
        const authorized_manager = await manager_crud.get_manager_by_id(authorized_manager_id)

        if (!authorized_manager)
        {
            return response(res, res_type.forbidden, { error: "Not authorized" })
        }

        const manager_to_delete = await manager_crud.get_manager_by_id(manager_to_delete_id)

        if (!manager_to_delete)
        {
            return response(res, res_type.not_found, { error: "The specified manager does not exist" })
        }

        if (!rights_to_create_manager(authorized_manager.role, manager_to_delete.role))
        {
            return response(res, res_type.forbidden, { error: "Not enough rights" })
        }

        const deleted_manager = await manager_crud.delete_manager(manager_to_delete.id)

        if (!deleted_manager)
        {
            return response(res, res_type.server_error, { error: "Can not delete manager" })
        }

        return response(res, res_type.ok, { deleted_manager: manager_model.manager_view_full(deleted_manager) })
    }
    catch (error: any)
    {
        return response(res, res_type.server_error, { error: error })
    }
}

export default
{
    delete_manager_by_id
}