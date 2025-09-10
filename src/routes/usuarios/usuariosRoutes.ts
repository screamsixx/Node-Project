import { Router } from 'express';
import { usuariosController } from '../../controllers/usuariosController';
import { AuthMiddleware } from '../../utils/authMiddleware';

const usuariosRouter = Router();
const usuariosControllerInstance = new usuariosController();
const authMiddlewareInstance = new AuthMiddleware();

// Rutas RESTful CRUD para usuarios
usuariosRouter.get('',authMiddlewareInstance.verifyToken, usuariosControllerInstance.getAll); 
usuariosRouter.get('/search',authMiddlewareInstance.verifyToken, usuariosControllerInstance.find);
usuariosRouter.get('/:id',authMiddlewareInstance.verifyToken, usuariosControllerInstance.getById);
usuariosRouter.post('', usuariosControllerInstance.create); 
usuariosRouter.put('/:id',authMiddlewareInstance.verifyToken, usuariosControllerInstance.update);
usuariosRouter.delete('/:id',authMiddlewareInstance.verifyToken, usuariosControllerInstance.delete);

export default usuariosRouter;