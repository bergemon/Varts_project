import { Request, Response } from 'hyper-express'
import { response, res_type } from '@/utils/response'
import user_crud from '@/resources/user/user.crud'
import send_email from '@/utils/send_email'
import { hashPassword, hash_it } from '@/utils/hash_some'
import auth from '@/utils/auth'

async function sign_up_user(req: Request, res: Response)
{
    const { email, password, password_repeat } = await req.json()

    try
    {
        if (!email && !password && !password_repeat)
        {
            return response(res, res_type.server_error, { error: 'Please write email, password & password_repeat' })
        }

        if (password !== password_repeat)
        {
            return response(res, res_type.forbidden, { error: 'Repeated password does not match' })
        }

        const emailUniq = await user_crud.get_user_by_email(email)
        if (emailUniq)
        {
            return response(res, res_type.bad_request, { error: 'User already exists' })
        }

        const user = await user_crud.create_user(email, hashPassword(password))
        if (!user)
        {
            return response(res, res_type.server_error, { error: 'User create error' })
        }

        const verification = await user_crud.create_verification_code(
            hash_it(email).toString(),
            user.id
        )

        send_email(
            `${email}`,
            `Varts online card game <${process.env.GOOGLE_USER}>`,
            `<h1>Go to ${process.env.BASE_URL_FRONTEND}/verified-user/${verification.hash} to verify your account<h1>`
        )

        const { session_token, refresh_token } = auth.generateTokens(user.id, user.email)

        if (!session_token || !refresh_token)
        {
            return response(res, res_type.server_error, { error: 'Failed to generate tokens' })
        }

        // Set tokens into cookies
        res.cookie('_stk', session_token)
        res.cookie('_rtk', refresh_token)
        return response(res, res_type.ok, { email: user.email, message: 'Please create profile.' })
    }
    catch (error: any)
    {
        return res.status(res_type.server_error).json({ error: error })
    }
}

async function verificate_user(req: Request, res: Response)
{
    const slug = req.params.hash

    if (slug.length !== 14)
    {
        return res
            .status(res_type.bad_request)
            .header("Content-Type", "text/html")
            .send("<h1>Wrong verification hash code</h1>")
    }

    const verification_code = await user_crud.verificate_and_delete(slug)

    if (!verification_code)
    {
        return res
            .status(res_type.bad_request)
            .header("Content-Type", "text/html")
            .send("<h1>Wrong verification hash code</h1>")
    }

    const updated_user = await user_crud.verify_user(verification_code.user_id)

    if (!updated_user)
    {
        return response(res, res_type.server_error, { error: "Can't update user"})
    }

    return res
        .status(res_type.ok)
        .header("Content-Type", "text/html")
        .send(`<h1>User ${updated_user.email} was succesfully verified!</h1>`)
}

async function send_verification_again(req: Request, res: Response)
{
    try
    {
        const user_id = req.locals.auth?.id
    
        const user = await user_crud.get_user(user_id)
    
        if (!user)
        {
            return response(res, res_type.server_error, { error: "Can't find user" })
        }
    
        if (user.verified)
        {
            return response(res, res_type.bad_request, { message: "User is already verified" })
        }
    
        const verification = await user_crud.find_verification_code(user_id)
    
        if (!verification)
        {
            return response(res, res_type.server_error, { error: "Can't find current user's verification code" })
        }
    
        send_email(
            `${user.email}`,
            `Varts online card game <${process.env.GOOGLE_USER}>`,
            `<h1>Go to ${process.env.BASE_URL_SERVICE}/user/verificate/${verification.hash} to verify your account<h1>`
        )
    
        return response(res, res_type.ok, { message: "Verification code was sent again" })
    }
    catch (error: any)
    {
        return res.status(res_type.server_error).json({ error: error })
    }
}

export default
{
    sign_up_user,
    verificate_user,
    send_verification_again
}