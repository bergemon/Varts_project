import { RoleType } from '@prisma/client'

export const exist_roles = [
    ...Object.keys(RoleType)
]

// First roles that will have the rights to create another managers
const first_roles_num = 2

const rights_to_create = [
    ...exist_roles.filter((elem, id) => ( id < first_roles_num ))
]

export function is_role_exist(role: string): boolean
{
    return exist_roles.find(elem => (
        elem === role
    ))
    ? true
    : false
}

// Other manager can be created only with the role that has less rights than the creator
export function rights_to_create_manager(manager_role: string, role: string): boolean
{
    // Manager role must have a rights to create other managers
    const found_id = rights_to_create.findIndex((elem: string) => (
        elem === manager_role
    ))

    // Provided role must exist and have less rights than the creator
    return exist_roles.find((elem, id) => elem === role && id > found_id && found_id !== -1)
        ? true
        : false
}