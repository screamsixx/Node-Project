import { Router } from 'express';
import { noticiasController } from '../../controllers/noticiasController';
// import { AuthMiddleware } from '../../utils/authMiddleware';

const noticiasRouter = Router();
const noticiasControllerInstance = new noticiasController();
// const authMiddlewareInstance = new AuthMiddleware();

// Rutas RESTful CRUD para noticias
noticiasRouter.get('', noticiasControllerInstance.getCryptoNews); // <-- Cambia '/' por ''

export default noticiasRouter;