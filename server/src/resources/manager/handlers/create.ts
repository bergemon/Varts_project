import { Request, Response } from 'hyper-express'
import { response, res_type } from '@/utils/response'
import { hash_password } from '@/utils/hash_some'
import manager_crud from '../manager.crud'
import { exist_roles, is_role_exist, rights_to_create_manager } from '../utils/check_role'

async function create_manager(req: Request, res: Response): Promise<Response>
{
    const manager_id = req.locals.auth?.id

    const { userName, email, role, password, password_repeat, language } = await req.json()

    try
    {
        // Get manager
        const manager = await manager_crud.get_manager_by_id(manager_id)

        if (!manager)
        {
            return response(res, res_type.forbidden, { error: "Prohibited route" })
        }

        // Check JSON fields
        if (!email && !role && !password && !password_repeat)
        {
            return response(res, res_type.bad_request,
                { error: "Please put email, role, password & password_repeat into JSON as fields" })
        }

        // Provied role must exist
        if (!is_role_exist(role))
        {
            return response(res, res_type.bad_request,
                { error: `Provided role must be [${exist_roles.join(', ')}]` })
        }

        const manager_role: string = manager.role

        // Need to check whether admin has the rights to create a manager with the such role
        if (!rights_to_create_manager(manager_role, role))
        {
            return response(res, res_type.forbidden,
                { error: `You have not enough rights to create a manager with the ${role} role`})
        }

        // Password must be equal to the repeated
        if (password !== password_repeat)
        {
            return response(res, res_type.bad_request,
                { error: "Repeated password does not match" })
        }

        const recieved_manager = await manager_crud.get_manager_by_email(email)

        if (recieved_manager)
        {
            return response(res, res_type.bad_request,
                { error: `Manager with email: ${email} is already exist` })
        }

        const hashed_password = hash_password(password)

        const created_manager = await manager_crud.create_manager(userName, email, hashed_password, language)

        if (!created_manager)
        {
            return response(res, res_type.server_error, { error: "Can not create new manager" })
        }

        return response(res, res_type.ok,
            {
                message: "New manager has been created",
                created_manager: created_manager
            }
        )
    }
    catch (error: any)
    {
        return response(res, res_type.server_error, { error: error })
    }
}

export default
{
    create_manager
}