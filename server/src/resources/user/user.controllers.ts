import { Request, Response } from 'hyper-express';
import { BadRequestResponse } from '@/utils/response';
import userServices from '@/resources/user/user.services';
import { compareWithHash, hashPassword } from '@/utils/hashPassword';
import auth from '@/utils/auth';
import { randomUUID } from 'crypto';
import { userModel } from './user.model';


// register
async function userRegister(req: Request, res: Response) {
    const { email, password, password_repeat } = await req.json()
    try {
        
        if(password !== password_repeat ) {
            return BadRequestResponse(res, 403, 'Password not repeat_password');
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
        return res.status(200).json({ access: accessToken, refresh: refreshToken, user: userModel(user) })
    } catch (error: any) {
        return res.status(500).json({ error: error });
    }
}

// login
async function userLogin(req: Request, res: Response) {
    const { email, password } = await req.json()
    try {
      const user = await userServices.userEmailPrisma(email)
  
      if (!user) return BadRequestResponse(res, 404, 'User not found');
  
      if (!compareWithHash(password, user.password)) return res.sendStatus(403)

      const jti = randomUUID();
  
      const { accessToken, refreshToken } = auth.generateTokens(user, jti)
      
      if (!accessToken || !refreshToken) {
        return BadRequestResponse(res, 500, 'Failed to generate tokens');
    }
  
      const userView = userModel(user)
  
      res.cookie('_refreshToken', refreshToken)
      return res.json({ access: accessToken, refresh: refreshToken, user: userView })
    } catch (error: any) {
        return res.status(500).json({ error: error });
    }
  }


  // информация о пользователе
async function userGet(req: Request, res: Response) {
    const id = req.locals.auth?.user?.id
    try {
      // Get current user
      const currentUser = await userServices.userGetPrisma(id)
  
      if (!currentUser) return BadRequestResponse(res, 401, 'User is not authorized');
  
      const response = userModel(currentUser)
  
      return res.json(response)
    } catch (error: any) {
        return res.status(500).json({ error: error });
    }
  }

export default {
    userRegister,
    userLogin,
    userGet
}