import { Request, Response } from 'hyper-express';
import { BadRequestResponse, CreatedResponse, NotFoundResponse, OkResponse } from '@/utils/response';
import userServices from '@/resources/user/user.services';
import { compareWithHash, hashPassword } from '@/utils/hashPassword';
import auth from '@/utils/auth';
import { randomUUID } from 'crypto';
import { userModel } from './user.model';
import walletServices from '../wallet/wallet.services';


// register
async function userRegister(req: Request, res: Response) {
    const { email, password, password_repeat } = await req.json()
    try {

        if(!email && !password && !password_repeat) return BadRequestResponse(res, 500, 'Please write');

        if (password !== password_repeat) {
            return BadRequestResponse(res, 403, 'Password not repeat password');
        }

        const emailUniq = await userServices.userEmailPrisma(email)

        if (emailUniq) {
            return BadRequestResponse(res, 403, 'User already exists');
        }

        const hashed = hashPassword(password)

        const user = await userServices.userCreatePrisma(email, hashed)

        if (!user) {
            return BadRequestResponse(res, 500, 'User create error');
        }

        const jti = randomUUID();

        const { accessToken, refreshToken } = auth.generateTokens(user, jti)

        if (!accessToken || !refreshToken) {
            return BadRequestResponse(res, 500, 'Failed to generate tokens');
        }

        res.cookie('_refreshToken', refreshToken)
        return CreatedResponse(res, { email: user.email, access: accessToken, message: 'Please create profile.' });
    } catch (error: any) {
        return res.status(500).json({ error: error });
    }
}


// create profile
async function userCreateProfile(req: Request, res: Response) {
    const id = req.locals.auth?.id;
    const { userName, birthDate, language } = await req.json();

    try {

        const user = await userServices.userGetPrisma(id);

        if (!user) return BadRequestResponse(res, 404, 'User not auth');

        const createProfile = await userServices.userCreateUserNamePrisma(
            user.id, userName, birthDate, language
        )

        if (!createProfile) return BadRequestResponse(res, 500, 'Profile create failed');

        const jti = randomUUID();

        const { accessToken, refreshToken } = auth.generateTokens(createProfile, jti);

        if (!accessToken || !refreshToken) {
            return BadRequestResponse(res, 500, 'Failed to generate tokens');
        }

        // проверка на существование кошелька
        const walletGet = await walletServices.walletGetPrisma(createProfile.id);

        if(!walletGet) {
            // создание нового кошелька
            await walletServices.walletCreatePrisma(createProfile.id)
        }

        const userView = userModel(createProfile);

        res.cookie('_refreshToken', refreshToken);
        return CreatedResponse(res, { access: accessToken, user: userView });
    } catch (error: any) {
        return res.status(500).json({ error: error });
    }
}

// login
async function userLogin(req: Request, res: Response) {
    const { email, password } = await req.json();
    try {

        if(!email || !password) return BadRequestResponse(res, 500, 'Please write');

        const user = await userServices.userEmailPrisma(email)

        if (!user) return BadRequestResponse(res, 404, 'User not found');


        if (!compareWithHash(password, user.password)) return BadRequestResponse(res, 403, 'Failed');

        const jti = randomUUID();

        const { accessToken, refreshToken } = auth.generateTokens(user, jti)

        if (!accessToken || !refreshToken) {
            BadRequestResponse(res, 500, 'Failed to generate tokens');
        }


        const userView = userModel(user);

        res.cookie('_refreshToken', refreshToken);

        if (!user.userName) return NotFoundResponse(res, "Please create profile.");

        return OkResponse(res, { access: accessToken, user: userView });
    } catch (error: any) {
        return res.status(500).json({ error: error });
    }
}


// информация о пользователе
async function userGet(req: Request, res: Response) {
    const id = req.locals.auth?.id;
    try {
        // Get current user
        const currentUser = await userServices.userGetPrisma(id);

        if (!currentUser) return BadRequestResponse(res, 401, 'User is not authorized');

        const response = userModel(currentUser)

        return OkResponse(res, response);
    } catch (error: any) {
        return res.status(500).json({ error: error });
    }
}

// обновление профиля
async function userUpdateProfile(req: Request, res: Response) {
    const id = req.locals.auth?.id;
    const { userName, birthDay, language } = await req.json()
    try {

        const currentUser = await userServices.userGetPrisma(id);

        if(!currentUser) return BadRequestResponse(res, 401, 'User is not authorized');

        const updateUser = await userServices.userUpdateProfilePrisma(
            id, userName, birthDay, language
        )

        if(!updateUser) return BadRequestResponse(res, 500, 'User failed update information');

        return OkResponse(res, userModel(updateUser));
    } catch(error: any) {
        return res.status(500).json({ error: error });
    }
}

export default {
    userRegister,
    userLogin,
    userGet,
    userCreateProfile,
    userUpdateProfile
}