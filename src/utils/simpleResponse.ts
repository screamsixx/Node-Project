import { Request, Response } from 'express';
import { respuesta } from '../models/respuesta';

export class simpleResponse {

 static success(_req: Request, res: Response, responseBody: any, status = 200) {
    const response: respuesta = {
      error: false,
      status: status,
      body: responseBody,
    };
    res.status(status).send(response);
  }

 static error(_req: Request, res: Response, responseBody: any, status = 500) {
    const response: respuesta = {
      error: true,
      status: status,
      body: responseBody,
    };
    res.status(status).send(response);
  }
}