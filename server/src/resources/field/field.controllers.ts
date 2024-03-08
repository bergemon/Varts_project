import { Request, Response } from 'hyper-express';
import { BadRequestResponse, CreatedResponse, NotFoundResponse, OkResponse } from '@/utils/response';
import fieldService from './field.service';
import { fieldsModel } from './field.model';


// get all
async function cardGetAll(req: Request, res: Response) {

    // const id = req.locals.auth?.id;
    const page = parseInt(req.query.page as string) || 1;
    const take = parseInt(req.query.take as string) || 1;

    try {

        // const currentManager = await managerService.managerGetPrisma(id);

        // if (!currentManager) return BadRequestResponse(res, 404, 'Manager not auth');

        const allFields = await fieldService.fieldGetAllPrisma(page, take);

        const total = await fieldService.hasNextPage();

        const totalPages = Math.ceil(total / take);

        const fieldView = allFields.map(item => fieldsModel(item))

        return CreatedResponse(res, { currentPage: page, totalPages: totalPages, fields: fieldView
        });
    } catch (error: any) {
        return res.status(500).json({ error: error });
    }
}

export default {
    cardGetAll
}