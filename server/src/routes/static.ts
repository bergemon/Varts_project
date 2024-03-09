import { Router } from 'hyper-express'
const LiveDirectory = require('live-directory')

const router = new Router()

const LocalFiles = new LiveDirectory('./public/files/images', {
    cache: {
        // 20 Gb
        max_file_count: 2e3,
        // 20 Mb
        max_file_size: 20e6
    },
})

router.get('/static/*', (request, response) => {
        const path = request.path.replace('/static', '')
        const file = LocalFiles.get(path)
        
        if (file === undefined) return response.status(404).send()
    
        const fileParts = file.path.split(".")
        const extension = fileParts[fileParts.length - 1]
    
        const content = file.content
        if (content instanceof Buffer) {
            return response.type(extension).send(content)
        } else {
            return response.type(extension).stream(content)
        }
    }
)

export default router