import { Router } from 'express';
import { noticiasController } from '../../controllers/noticiasController';
// import { AuthMiddleware } from '../../utils/authMiddleware';

const noticiasRouter = Router();
const noticiasControllerInstance = new noticiasController();
// const authMiddlewareInstance = new AuthMiddleware();



/**
 * @swagger
 * tags:
 *   name: Noticias
 *   description: Endpoints para obtener noticias de criptomonedas
 */

/**
 * @swagger
 * /noticias:
 *   get:
 *     summary: Obtiene las últimas noticias de criptomonedas
 *     description: Retorna un listado de noticias relacionadas con criptomonedas.
 *     tags: [Noticias]
 *     responses:
 *       200:
 *         description: Listado de noticias obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     description: Título de la noticia
 *                   description:
 *                     type: string
 *                     description: Descripción breve de la noticia
 *                   url:
 *                     type: string
 *                     description: URL de la noticia completa
 *                   publishedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha de publicación de la noticia
 *       500:
 *         description: Error al obtener las noticias
 */

// Rutas RESTful CRUD para noticias
noticiasRouter.get('', noticiasControllerInstance.getCryptoNews); // <-- Cambia '/' por ''

export default noticiasRouter;