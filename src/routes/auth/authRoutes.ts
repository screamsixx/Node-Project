import { Router } from 'express';

import { authController } from '../../controllers/authController';
// import { AuthMiddleware } from '../../utils/authMiddleware';

const authRouter = Router();
const authControllerInstance = new authController();
// const authMiddlewareInstance = new AuthMiddleware();

// Rutas RESTful CRUD para auth
authRouter.post('/login', authControllerInstance.login); 

export default authRouter;