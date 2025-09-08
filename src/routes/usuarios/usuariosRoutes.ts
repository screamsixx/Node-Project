import { Router } from 'express';
import { usuariosController } from '../../controllers/usuariosController';
// import { AuthMiddleware } from '../../utils/authMiddleware';

const usuariosRouter = Router();
const usuariosControllerInstance = new usuariosController();
// const authMiddlewareInstance = new AuthMiddleware();

// Rutas RESTful CRUD para usuarios
usuariosRouter.get('', usuariosControllerInstance.getAll); // <-- Cambia '/' por ''
usuariosRouter.get('/search', usuariosControllerInstance.find);
usuariosRouter.get('/:id', usuariosControllerInstance.getById);
usuariosRouter.post('', usuariosControllerInstance.create); // <-- Cambia '/' por ''
usuariosRouter.put('/:id', usuariosControllerInstance.update);
usuariosRouter.delete('/:id', usuariosControllerInstance.delete);

export default usuariosRouter;