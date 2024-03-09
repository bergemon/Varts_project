import { Response } from 'hyper-express';

interface ResponseData {
 status: string;
 message: string;
 data: any;
}

const OkResponse = (res: Response, data: any): Response => {
   return res
       .status(200)
       .header('Connection', 'keep-alive')
       .header('Keep-Alive', 'timeout=20')
       .header('Content-Type', 'application/json')
       .send(
           JSON.stringify({
               status: 'Success',
               message: 'Success',
               data,
           } as ResponseData),
       )
       .end()
};

const NotFoundResponse = (res: Response, message: string): Response => {
   return res
       .status(404)
       .header('Connection', 'keep-alive')
       .header('Keep-Alive', 'timeout=5')
       .header('Content-Type', 'application/json; charset=utf-8')
       .header('Test', 'test')
       .send(
           JSON.stringify({
               status: 'Not Found',
               message,
           } as ResponseData),
       )
       .end()
};

const CreatedResponse = (res: Response, data: any): Response => {
   return res
       .status(201)
       .header('Connection', 'keep-alive')
       .header('Keep-Alive', 'timeout=5')
       .header('Content-Type', 'application/json; charset=utf-8')
       .send(
           JSON.stringify({
               status: 'Success',
               message: 'Success',
               data,
           } as ResponseData),
       )
       .end()
};

const BadRequestResponse = (res: Response, status: number, message: string): Response => {
   return res
       .status(status)
       .header('Connection', 'keep-alive')
       .header('Keep-Alive', 'timeout=5')
       .header('Content-Type', 'application/json; charset=utf-8')
       .send(
           JSON.stringify({
               status: 'Bad Request',
               message,
           } as ResponseData),
       )
       .end()
};

export { OkResponse, NotFoundResponse, CreatedResponse, BadRequestResponse }