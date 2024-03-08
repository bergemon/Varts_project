import { Request, Response } from 'hyper-express';
import { BadRequestResponse, CreatedResponse, NotFoundResponse, OkResponse } from '@/utils/response';
import cardService from './card.service';
import { cardsModel } from './card.model';

// get all
async function cardGetAll(req: Request, res: Response) {

    // const id = req.locals.auth?.id;
    const page = parseInt(req.query.page as string) || 1;
    const take = parseInt(req.query.take as string) || 1;

    try {

        // const currentManager = await managerService.managerGetPrisma(id);

        // if (!currentManager) return BadRequestResponse(res, 404, 'Manager not auth');

        const allCard = await cardService.cardGetAllPrisma(page, take);

        const total = await cardService.hasNextPage();

        const totalPages = Math.ceil(total / take);

        const cardView = allCard.map(item => cardsModel(item))

        return CreatedResponse(res, { currentPage: page, totalPages: totalPages, cards: cardView
        });
    } catch (error: any) {
        return res.status(500).json({ error: error });
    }
}

export default {
    cardGetAll
}