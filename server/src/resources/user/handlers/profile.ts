import { Request, Response } from 'hyper-express'
import { response, res_type } from '@/utils/response'
import user_crud from '@/resources/user/user.crud'
import user_model from '../user.model'
import walletServices from '@/resources/wallet/wallet.services'


// create profile
async function create_profile(req: Request, res: Response)
{
    const id = req.locals.auth?.id
    const { user_name, birth_date, language } = await req.json()

    try
    {
        if (!user_name || !birth_date || !language)
        {
            return response(res, res_type.bad_request, { error: "put user_name, birth_date & language into request json body" })
        }

        const user = await user_crud.get_user(id)

        if (!user)
        {
            return response(res, res_type.not_found, { error: 'User not found'})
        }

        if (user.username || user.birthday)
        {
            return response(res, res_type.bad_request, { error: 'Profile is already initialized' })
        }

        const createProfile = await user_crud.init_profile(
            user.id, user_name, birth_date, language
        )

        if (!createProfile)
        {
            return response(res, res_type.server_error, { error: 'Profile creation failed' })
        }

        // проверка на существование кошелька
        const wallet_check = await walletServices.get_wallet(createProfile.id)

        if (!wallet_check)
        {
            // создание нового кошелька
            const new_wallet = await walletServices.init_wallet(createProfile.id)

            if (!new_wallet)
            {
                return response(res, res_type.server_error, { error: "Cant' create a wallet" })
            }
        }

        const updated_user = user_model.get(createProfile)

        if (!updated_user)
        {
            return response(res, res_type.server_error, { error: "Can't create user profile" })
        }

        return response(res, res_type.ok, { message: "User's profile has been updated" })
    }
    catch (error: any)
    {
        return res.status(res_type.server_error).json({ error: error })
    }
}

// обновление профиля
async function update_profile(req: Request, res: Response)
{
    const id = req.locals.auth?.id

    let { username, birthday, language } = await req.json()

    try
    {
        const user = await user_crud.get_user(id)

        if (!user)
        {
            return response(res, res_type.server_error, { error: "Can't get the user" })
        }

        // Need to provide at least one field
        if (!username && !birthday && !language)
        {
            const error = "Provide at least one of those fields: username, birthday, language"
            return response(res, res_type.bad_request, { error: error })
        }

        // If some fields was not provided by the frontend
        if (!username)
        {
            username = user.username
        }
        if (!birthday)
        {
            birthday = user.birthday
        }
        if (!language)
        {
            language = user.language
        }

        const updateUser = await user_crud.update_profile(
            id, username, birthday, language
        )

        if (!updateUser)
        {
            return response(res, res_type.server_error, { error: 'User failed update information' })
        }

        return response(res, res_type.ok, user_model.get(updateUser))
    }
    catch(error: any)
    {
        return res.status(res_type.server_error).json({ error: error })
    }
}

export default
{
    create_profile,
    update_profile
}