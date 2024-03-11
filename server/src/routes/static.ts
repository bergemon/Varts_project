import { Router } from 'hyper-express'
import { Request, Response } from 'hyper-express'
import { response, res_type } from '@/utils/response'
import LiveDirectory from 'live-directory'

const router = new Router()

const LocalFiles = new LiveDirectory('./public/files/images', {
    cache: {
        // 20 Gb
        max_file_count: 2e3,
        // 20 Mb
        max_file_size: 20e6
    },
})

router.get('/static/*', (req: Request, res: Response): Response =>
{
        const path = req.path.replace('/static', '')
        const file = LocalFiles.get(path)
        
        if (file === undefined)
        {
            return response(res, res_type.not_found, {error: "File not found"})
        }
    
        const fileParts = file.path.split(".")
        const extension = fileParts[fileParts.length - 1]
    
        const content = file.content
        
        return res.type(extension).send(content)
    }
)

export default router