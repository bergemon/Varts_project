import { Request, Response } from 'hyper-express';
import { BadRequestResponse, CreatedResponse, NotFoundResponse, OkResponse } from '@/utils/response';
import { randomUUID } from 'crypto';
import fileNormilize from '@/utils/fileNormilize';
import fieldAdminService from './field.admin.service';
import { fieldsModel } from '../field.model';

// field create
async function fieldAdminCreate(req: Request, res: Response) {

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
                save_path = `./src/public/files/images/fields/${fileName}`;
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


        if (!name && !author && !imageSave) return BadRequestResponse(res, 500, 'Fields create failed');

        if (typeof imageSave !== 'string') {
            return BadRequestResponse(res, 500, 'Invalid image path');
        }

        const fieldCreate = await fieldAdminService.fieldCreatePrisma(name, author, imageSave, hashtag)

        return CreatedResponse(res, fieldsModel(fieldCreate));
    } catch (error: any) {
        return res.status(500).json({ error: error });
    }
}


// field update
async function fieldAdminUpdate(req: Request, res: Response) {

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
                save_path = `./src/public/files/images/fields/${fileName}`;
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

        if (!name && !author && !imageSave) return BadRequestResponse(res, 500, 'Field create failed');

        if (typeof imageSave !== 'string') {
            return BadRequestResponse(res, 500, 'Invalid image path');
        }

        const updatedField = await fieldAdminService.fieldUpdatePrisma(id, name, author, imageSave, hashtag)

        return CreatedResponse(res, fieldsModel(updatedField));
    } catch (error: any) {
        return res.status(500).json({ error: error });
    }
}

// field delete
async function fieldAdminDelete(req: Request, res: Response) {

    // const id = req.locals.auth?.id;

    const { id } = req.path_parameters;

    try {

        // const currentManager = await managerService.managerGetPrisma(id);

        // if (!currentManager) return BadRequestResponse(res, 404, 'Manager not auth');

        if (!id) return BadRequestResponse(res, 500, 'Field delete failed');

        const deletedCard = await fieldAdminService.fieldDeletePrisma(id);

        return CreatedResponse(res, `Field delete succesfully ${deletedCard.id}`);
    } catch (error: any) {
        return res.status(500).json({ error: error });
    }
}


// get all
async function fieldAdminGetAll(req: Request, res: Response) {

    // const id = req.locals.auth?.id;
    const page = parseInt(req.query.page as string) || 1;
    const take = parseInt(req.query.take as string) || 1;

    try {

        // const currentManager = await managerService.managerGetPrisma(id);

        // if (!currentManager) return BadRequestResponse(res, 404, 'Manager not auth');

        const allField = await fieldAdminService.fieldGetAllPrisma(page, take);

        const total = await fieldAdminService.hasNextPage();

        const totalPages = Math.ceil(total / take);

        const fieldView = allField.map(item => fieldsModel(item))

        return CreatedResponse(res, { currentPage: page, totalPages: totalPages, fields: fieldView
        });
    } catch (error: any) {
        return res.status(500).json({ error: error });
    }
}


export default {
    fieldAdminCreate,
    fieldAdminUpdate,
    fieldAdminDelete,
    fieldAdminGetAll
}