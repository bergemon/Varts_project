import manager_model from '../manager.model'
import { exist_roles } from './check_role'
import { Manager, RoleType } from '@prisma/client'

export function get_manager_view_by_rights(
    authorized_manager_role: RoleType,
    desired_manager_role: RoleType,
    found_manager: Manager
)
{
    const authorized_manager_role_rights = exist_roles.findIndex(elem => elem === authorized_manager_role)

    const desired_manager_rights = exist_roles.findIndex(elem => elem === desired_manager_role)

    // Return full view if current manager's role has higher authority
    // aka is left of desired manager's role in an array
    return authorized_manager_role_rights < desired_manager_rights
        ? manager_model.manager_view_full(found_manager)
        : manager_model.manager_view_partial(found_manager)
}