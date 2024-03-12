import bcrypt from "bcrypt"
import hash from 'hash-it'

export const hash_it = (src: string) =>
{
    return hash(src)
}

const saltRounds = 10
export function hashPassword(password: string)
{
    return bcrypt.hashSync(password, saltRounds)
}

export function compareWithHash(password: string, hash: string)
{
    return bcrypt.compareSync(password, hash)
}