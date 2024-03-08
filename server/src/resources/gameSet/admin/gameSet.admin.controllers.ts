import { Request, Response } from 'hyper-express';
import { BadRequestResponse, CreatedResponse, NotFoundResponse, OkResponse } from '@/utils/response';
import { randomUUID } from 'crypto';
import managerService from '@/resources/manager/manager.service';
import fileNormilize from '@/utils/fileNormilize';
import gameSetAdminService from './gameSet.admin.service';
import { gameSetModel } from '../gameSet.model';

// game set create
async function gameSetAdminCreate(req: Request, res: Response) {

    // const id = req.locals.auth?.id;

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
                save_path = `./src/public/files/images/gameSets/${fileName}`;
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

        const gameSetCreate = await gameSetAdminService.gameSetCreatePrisma(name, author, imageSave, hashtag)

        return CreatedResponse(res, gameSetModel(gameSetCreate));
    } catch (error: any) {
        return res.status(500).json({ error: error });
    }
}


// game set update
async function gameSetAdminUpdate(req: Request, res: Response) {

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
                save_path = `./src/public/files/images/gameSets/${fileName}`;
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

        const updatedGameSet = await gameSetAdminService.GameSetUpdatePrisma(id, name, author, imageSave, hashtag)

        return CreatedResponse(res, gameSetModel(updatedGameSet));
    } catch (error: any) {
        return res.status(500).json({ error: error });
    }
}

// game set delete
async function gameSetAdminDelete(req: Request, res: Response) {

    // const id = req.locals.auth?.id;

    const { id } = req.path_parameters;

    try {

        // const currentManager = await managerService.managerGetPrisma(id);

        // if (!currentManager) return BadRequestResponse(res, 404, 'Manager not auth');

        if (!id) return BadRequestResponse(res, 500, 'Game set delete failed');

        const deletedGameSet = await gameSetAdminService.gameSetDeletePrisma(id);

        return CreatedResponse(res, `Game set delete succesfully ${deletedGameSet.id}`);
    } catch (error: any) {
        return res.status(500).json({ error: error });
    }
}


// get all
async function gameSetAdminGetAll(req: Request, res: Response) {

    // const id = req.locals.auth?.id;
    const page = parseInt(req.query.page as string) || 1;
    const take = parseInt(req.query.take as string) || 1;

    try {

        // const currentManager = await managerService.managerGetPrisma(id);

        // if (!currentManager) return BadRequestResponse(res, 404, 'Manager not auth');

        const allGameSet = await gameSetAdminService.gameSetGetAllPrisma(page, take);

        const total = await gameSetAdminService.hasNextPage();

        const totalPages = Math.ceil(total / take);

        const gameSetView = allGameSet.map(item => gameSetModel(item))

        return OkResponse(res, { currentPage: page, totalPages: totalPages, sets: gameSetView });
    } catch (error: any) {
        return res.status(500).json({ error: error });
    }
}


// game set get by id
async function gameSetGetById(req: Request, res: Response) {

    // const id = req.locals.auth?.id;

    const { id } = req.path_parameters;

    try {

        // const currentManager = await managerService.managerGetPrisma(id);

        // if (!currentManager) return BadRequestResponse(res, 404, 'Manager not auth');

        if (!id) return BadRequestResponse(res, 500, 'Game set delete failed');

        const gameSetById = await gameSetAdminService.gameSetGetByIdCardFieldPrisma(id);

        if (!gameSetById) {
            // Обработка случая, когда gameSet не найден
            return  NotFoundResponse(res, 'Game set find failed');
        }

        return OkResponse(res,  gameSetModel(gameSetById));
    } catch (error: any) {
        return res.status(500).json({ error: error });
    }
}

// game set get by id
async function gameSetAddCardField(req: Request, res: Response) {

    // const id = req.locals.auth?.id;

    const { id } = req.path_parameters;
    
    const { fieldId, cards } = await req.json()

    try {

        if (typeof fieldId !== 'string') {
            // Обработка случая, когда fieldId не является строкой
            return BadRequestResponse(res, 400, 'Invalid fieldId format');
        }

        if (!Array.isArray(cards) || !cards.every(card => typeof card === 'string')) {
            // Обработка случая, когда cards не является массивом строк
            return BadRequestResponse(res, 400, 'Invalid cards format');
        }

        // const currentManager = await managerService.managerGetPrisma(id);

        // if (!currentManager) return BadRequestResponse(res, 404, 'Manager not auth');

        const gameSetById = await gameSetAdminService.gameSetGetByIdCardFieldPrisma(id);

        if (!gameSetById) {
            // Обработка случая, когда gameSet не найден
            return  NotFoundResponse(res, 'Game set find failed');
        }

        const gameSetAdd = await gameSetAdminService.gameSetAddCardFieldPrisma(id, fieldId, cards);

        return OkResponse(res, gameSetModel(gameSetAdd));
    } catch (error: any) {
        return res.status(500).json({ error: error });
    }
}


export default {
    gameSetAdminCreate,
    gameSetAdminUpdate,
    gameSetAdminDelete,
    gameSetAdminGetAll,
    gameSetGetById,
    gameSetAddCardField
}