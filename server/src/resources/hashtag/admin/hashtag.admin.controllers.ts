import { Request, Response } from 'hyper-express';
import { BadRequestResponse, CreatedResponse, NotFoundResponse, OkResponse } from '@/utils/response';
import hashtagAdminService from './hashtag.admin.service';

// card update
async function hashTagAdminDelete(req: Request, res: Response) {

    // const id = req.locals.auth?.id;

    const { id } = req.path_parameters;

    try {

        // const currentManager = await managerService.managerGetPrisma(id);

        // if (!currentManager) return BadRequestResponse(res, 404, 'Manager not auth');

        if (!id) return BadRequestResponse(res, 500, 'Card delete failed');

        const deletedCard = await hashtagAdminService.hashTagAdminDeletePrisma(id);

        return CreatedResponse(res, `Card delete succesfully ${deletedCard.id}`);
    } catch (error: any) {
        return res.status(500).json({ error: error });
    }
}

export default {
    hashTagAdminDelete
}