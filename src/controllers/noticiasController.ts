import { Request, Response } from 'express';
import { NoticiasServices } from '../services/noticiasServices'; // Asegúrate de que la ruta sea correcta
import { simpleResponse } from '../utils/simpleResponse';

export class noticiasController {

    public getCryptoNews(req: Request, res: Response) {
        // Llama al servicio para obtener las noticias de forma asíncrona
        NoticiasServices.getNoticiasCrypto().subscribe({
            next: noticias => {
                // Si la suscripción es exitosa, envía una respuesta de éxito con los datos
                simpleResponse.success(req, res, noticias);
            },
            error: err => {
                // Si ocurre un error, lo registra y envía una respuesta de error al cliente
                console.error('Error al obtener noticias:', err);
                simpleResponse.error(req, res, 'No se pudieron recuperar las noticias. Por favor, inténtelo de nuevo más tarde.', 500);
            }
        });
    }
}