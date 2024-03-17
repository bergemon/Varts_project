import { Request, Response } from 'hyper-express'
import { response, res_type } from '@/utils/response'
import manager_crud from '../manager.crud'
import manager_models from '../manager.model'

async function find_managers_by_username(req: Request, res: Response): Promise<Response>
{
    const find_by_username = req.params.username

    try
    {
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
    
        const found_managers =
            await manager_crud.get_managers_by_username(find_by_username, parseInt(page), parseInt(limit))
    
        const manager_views = found_managers.map(elem => manager_models.manager_view_partial(elem))
    
        return response(res, res_type.ok, { results: manager_views })
    }
    catch (error: any)
    {
        return response(res, res_type.server_error, { error: error })
    }
}

async function find_managers_by_email(req: Request, res: Response): Promise<Response>
{
    const authorized_manager_id = req.locals.auth?.id

    const find_by_email = req.params.email

    try
    {
        const authorized_manager = await manager_crud.get_manager_by_id(authorized_manager_id)
        if (!authorized_manager)
        {
            return response(res, res_type.forbidden, { error: "Prohibited route" })
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

        const found_managers =
            await manager_crud.get_managers_by_email(find_by_email, parseInt(page), parseInt(limit))

        const manager_views = found_managers.map(elem => manager_models.manager_view_partial(elem))

        return response(res, res_type.ok, { results: manager_views })
    }
    catch (error: any)
    {
        return response(res, res_type.server_error, { error: error })
    }
}

export default
{
    find_managers_by_username,
    find_managers_by_email
}