import { Request, Response } from 'hyper-express';
import { BadRequestResponse, CreatedResponse, NotFoundResponse, OkResponse } from '@/utils/response';
import card_crud from './card.crud';
import { cardsModel } from './card.model';

// get all
async function cardGetAll(req: Request, res: Response) {

    // const id = req.locals.auth?.id;
    const page = parseInt(req.query.page as string) || 1
    const take = parseInt(req.query.take as string) || 1

    try
    {
        // const currentManager = await managerService.managerGetPrisma(id)

        // if (!currentManager) return BadRequestResponse(res, 404, 'Manager not auth')

        const allCard = await card_crud.get_all_cards(page, take)

        const total = await card_crud.has_next_page()

        const totalPages = Math.ceil(total / take)

        const cardView = allCard.map(item => cardsModel(item))

        return CreatedResponse(res, { currentPage: page, totalPages: totalPages, cards: cardView
        });
    }
    catch (error: any)
    {
        return res.status(500).json({ error: error })
    }
}

export default {
    cardGetAll
}