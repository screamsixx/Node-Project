import { Request, Response } from 'express';
import { NoticiasServices } from '../services/noticiasServices'; // Asegúrate de que la ruta sea correcta
import { simpleResponse } from '../utils/simpleResponse';

export class noticiasController {
    /**
     * @swagger
     * /noticiasCrypto:
     * get:
     * summary: Obtiene noticias sobre criptomonedas
     * description: Devuelve una lista de las 10 noticias más recientes relacionadas con el tema 'crypto'.
     * tags:
     * - Noticias
     * responses:
     * 200:
     * description: Noticias obtenidas exitosamente.
     * content:
     * application/json:
     * schema:
     * type: object
     * properties:
     * status:
     * type: string
     * example: success
     * data:
     * type: array
     * items:
     * type: object
     * properties:
     * title:
     * type: string
     * description:
     * type: string
     * url:
     * type: string
     * publishedAt:
     * type: string
     * 500:
     * description: Error del servidor.
     * content:
     * application/json:
     * schema:
     * type: object
     * properties:
     * status:
     * type: string
     * example: error
     * message:
     * type: string
     * example: No se pudieron recuperar las noticias. Por favor, inténtelo de nuevo más tarde.
     */
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