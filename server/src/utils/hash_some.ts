import bcrypt from "bcrypt"
import hash from "hash-it"

// hash it, simple hash lib
// used for email verification uris
export const hash_it = (src: string) =>
{
    return hash(src)
}

// brypct hash functions
// used to crypt and encrypt user's and manager's password
const saltRounds = 10

export function hash_password(password: string)
{
    return bcrypt.hashSync(password, saltRounds)
}

export function compare_passwords(password: string, hash: string)
{
    return bcrypt.compareSync(password, hash)
}