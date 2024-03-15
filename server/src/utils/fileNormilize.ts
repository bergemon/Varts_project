import { Request } from 'hyper-express'

export default async function fileNormilize(req: Request, file: string)
{
    if(!file)
    {
        return undefined
    }

    return `${req.protocol}://${req.hostname}:5000/static/
        ${file.split('\\').pop()}`.split('./src/public/files/images/').join('')
};