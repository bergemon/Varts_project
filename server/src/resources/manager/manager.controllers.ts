import { Request, Response } from 'hyper-express'
import { BadRequestResponse, CreatedResponse, NotFoundResponse, OkResponse } from '@/utils/response'
import userServices from '@/resources/user/user.services'
import { compareWithHash, hashPassword } from '@/utils/hash_some'
import auth from '@/utils/auth'
import { randomUUID } from 'crypto'
import managerService from './manager.service'
import { managerModel } from './manager.model'

// register
async function managerRegister(req: Request, res: Response) {
    const { userName, email, password, password_repeat } = await req.json()
    try {

        if(!email && !password && !password_repeat) return BadRequestResponse(res, 500, 'Please write');

        if (password !== password_repeat) {
            return BadRequestResponse(res, 403, 'Password not repeat password');
        }

        const emailUniq = await managerService.managerEmailPrisma(email)

        if (emailUniq) {
            return BadRequestResponse(res, 403, 'Manager already exists');
        }

        const hashed = hashPassword(password)

        const manager = await managerService.managerCreatePrisma(userName, email, hashed)

        if (!manager) {
            return BadRequestResponse(res, 500, 'Manager create error');
        }

        const jti = randomUUID();

        const { accessToken, refreshToken } = auth.generateTokens(manager, jti)

        if (!accessToken || !refreshToken) {
            return BadRequestResponse(res, 500, 'Failed to generate tokens');
        }

        const managerView = managerModel(manager);

        res.cookie('_refreshToken', refreshToken)
        return CreatedResponse(res, { manager: managerView, accessToken: accessToken });
    } catch (error: any) {
        return res.status(500).json({ error: error });
    }
}

// login
async function managerLogin(req: Request, res: Response) {
    const { email, password } = await req.json()
    try {

        if(!email || !password) return BadRequestResponse(res, 500, 'Please write');

        const manager = await managerService.managerEmailPrisma(email)

        if (!manager) return BadRequestResponse(res, 404, 'Manager not found');


        if (!compareWithHash(password, manager.password)) return BadRequestResponse(res, 403, 'Failed');

        const jti = randomUUID();

        const { accessToken, refreshToken } = auth.generateTokens(manager, jti)

        if (!accessToken || !refreshToken) {
            BadRequestResponse(res, 500, 'Failed to generate tokens');
        }


        const managerView = managerModel(manager);

        res.cookie('_refreshToken', refreshToken);

        return OkResponse(res, { accessToken: accessToken, manager: managerView });
    } catch (error: any) {
        return res.status(500).json({ error: error });
    }
}


// информация о манагере
async function managerGet(req: Request, res: Response) {
    const id = req.locals.auth?.id;
    try {
        // Get current user
        const currentManager = await managerService.managerGetPrisma(id);

        if (!currentManager) return BadRequestResponse(res, 401, 'Manager is not authorized');

        const response = managerModel(currentManager)

        return OkResponse(res, response);
    } catch (error: any) {
        return res.status(500).json({ error: error });
    }
}

// обновление профиля
async function managerUpdateProfile(req: Request, res: Response) {
    const id = req.locals.auth?.id;
    const { userName, password, password_repeat } = await req.json()
    try {

        if (password !== password_repeat) {
            return BadRequestResponse(res, 403, 'Password not repeat password');
        }

        const currentManager = await managerService.managerGetPrisma(id);

        if(!currentManager) return BadRequestResponse(res, 401, 'Manager is not authorized');

        const updateManager = await managerService.managerUpdatePrisma(
            id, userName, password
        )

        if(!updateManager) return BadRequestResponse(res, 500, 'Manager failed update information');

        return OkResponse(res, managerModel(updateManager));
    } catch(error: any) {
        return res.status(500).json({ error: error });
    }
}

export default {
    managerRegister,
    managerLogin,
    managerGet,
    managerUpdateProfile
}