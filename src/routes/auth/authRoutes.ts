import { Router } from 'express';
import { authController } from '../../controllers/authController';
// import { AuthMiddleware } from '../../utils/authMiddleware';

const authRouter = Router();
const authControllerInstance = new authController();
// const authMiddlewareInstance = new AuthMiddleware();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints para autorización de usuarios
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autorización de usuario
 *     description: Permite a un usuario iniciar sesión usando su nombre de usuario y contraseña.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre_usuario
 *               - contraseña
 *             properties:
 *               nombre_usuario:
 *                 type: string
 *                 description: Nombre de usuario del usuario
 *               contraseña:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: autorización exitosa, devuelve datos del usuario y token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuario:
 *                   type: object
 *                   description: Datos del usuario autenticado
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID del usuario
 *                     nombre_usuario:
 *                       type: string
 *                     email:
 *                       type: string
 *                     rol:
 *                       type: string
 *                 token:
 *                   type: string
 *                   description: Token JWT para autorización
 *       400:
 *         description: Faltan campos requeridos en el body
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error interno del servidor
 */
authRouter.post('/login', authControllerInstance.login);

export default authRouter;
