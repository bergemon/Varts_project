import { Request, Response } from 'hyper-express'
import { BadRequestResponse, CreatedResponse, NotFoundResponse, OkResponse } from '@/utils/response'
import { randomUUID } from 'crypto'
import managerService from '@/resources/manager/manager.service'
import cardAdminService from './card.admin.service'
import { cardsModel } from '../card.model'
import fileNormilize from '@/utils/fileNormilize'

// card create
async function cardAdminCreate(req: Request, res: Response) {

    // const id = req.locals.auth?.id
    let save_path = ''
    let name: string = '', author: string = '', hashtag: string[] = []

    try {
        // const currentManager = await managerService.managerGetPrisma(id)
        // if (!currentManager) return BadRequestResponse(res, 404, 'Manager not auth')

        await req.multipart(async (field) =>
        {
            if (field.file)
            {
                const ext = field.file.name?.split(".").pop()
                const jti = randomUUID()
                const fileName = jti + "." + ext
                save_path = `./src/public/files/images/cards/${fileName}`
                await field.write(save_path)
            }
            else if (field.name)
            {
                // Обработка текстовых полей
                if (field.name === 'name')
                {
                    name = field.value as string
                }
                else if (field.name === 'author')
                {
                    author = field.value as string
                }
                else if(field.name === 'hashtag')
                {
                    hashtag.push(field.value as string)
                }
            }
        })

        const imageSave = await fileNormilize(req, save_path)

        if (!name && !author && !imageSave)
        {
            return BadRequestResponse(res, 500, 'Card create failed')
        }

        if (typeof imageSave !== 'string')
        {
            return BadRequestResponse(res, 500, 'Invalid image path')
        }

        const cardCreate = await cardAdminService.cardCreatePrisma(name, author, imageSave, hashtag)

        return CreatedResponse(res, cardsModel(cardCreate))
    }
    catch (error: any)
    {
        return res.status(500).json({ error: error })
    }
}


// card update
async function cardAdminUpdate(req: Request, res: Response) {

    // const id = req.locals.auth?.id;

    const { id } = req.path_parameters;

    let save_path = '';
    let name: string = '', author: string = '', hashtag: string[] = [];

    try {

        // const currentManager = await managerService.managerGetPrisma(id);

        // if (!currentManager) return BadRequestResponse(res, 404, 'Manager not auth');

        await req.multipart(async (field) => {
            if (field.file) {
                const ext = field.file.name?.split(".").pop();
                const jti = randomUUID();
                const fileName = jti + "." + ext
                save_path = `./src/public/files/images/cards/${fileName}`;
                await field.write(save_path);
            } else if (field.name) {
                // Обработка текстовых полей
                if (field.name === 'name') {
                    name = field.value as string;
                } else if (field.name === 'author') {
                    author = field.value as string;
                } else if(field.name === 'hashtag') {
                    hashtag.push(field.value as string);
                }
            }
        });

        const imageSave = await fileNormilize(req, save_path);

        if (!name && !author && !imageSave) return BadRequestResponse(res, 500, 'Card create failed');

        if (typeof imageSave !== 'string') {
            return BadRequestResponse(res, 500, 'Invalid image path');
        }

        const updatedCard = await cardAdminService.cardUpdatePrisma(id, name, author, imageSave, hashtag)

        return CreatedResponse(res, cardsModel(updatedCard));
    } catch (error: any) {
        return res.status(500).json({ error: error });
    }
}

// card update
async function cardAdminDelete(req: Request, res: Response) {

    // const id = req.locals.auth?.id;

    const { id } = req.path_parameters;

    try {

        // const currentManager = await managerService.managerGetPrisma(id);

        // if (!currentManager) return BadRequestResponse(res, 404, 'Manager not auth');

        if (!id) return BadRequestResponse(res, 500, 'Card delete failed');

        const deletedCard = await cardAdminService.cardDeletePrisma(id);

        return CreatedResponse(res, `Card delete succesfully ${deletedCard.id}`);
    } catch (error: any) {
        return res.status(500).json({ error: error });
    }
}


// get all
async function cardAdminGetAll(req: Request, res: Response) {

    // const id = req.locals.auth?.id;
    const page = parseInt(req.query.page as string) || 1;
    const take = parseInt(req.query.take as string) || 1;

    try {

        // const currentManager = await managerService.managerGetPrisma(id);

        // if (!currentManager) return BadRequestResponse(res, 404, 'Manager not auth');

        const allCard = await cardAdminService.cardGetAllPrisma(page, take);

        const total = await cardAdminService.hasNextPage();

        const totalPages = Math.ceil(total / take);

        const cardView = allCard.map(item => cardsModel(item))

        return CreatedResponse(res, { currentPage: page, totalPages: totalPages, cards: cardView
        });
    } catch (error: any) {
        return res.status(500).json({ error: error });
    }
}


export default {
    cardAdminCreate,
    cardAdminUpdate,
    cardAdminDelete,
    cardAdminGetAll
}