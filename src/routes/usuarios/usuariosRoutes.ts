import { Router } from 'express';
import { usuariosController } from '../../controllers/usuariosController';
import { AuthMiddleware } from '../../utils/authMiddleware';

const usuariosRouter = Router();
const usuariosControllerInstance = new usuariosController();
const authMiddlewareInstance = new AuthMiddleware();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Operaciones relacionadas con usuarios
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: |
 *       Devuelve la lista completa de usuarios registrados en el sistema.
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *       500:
 *         description: Error al obtener usuarios
 */

/**
 * @swagger
 * /usuarios/search:
 *   get:
 *     summary: Buscar usuarios por filtros
 *     description: |
 *       Permite filtrar usuarios por rol, email, nombre de usuario o estatus.
 *       Es obligatorio proporcionar al menos un filtro.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: query
 *         name: rol
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *       - in: query
 *         name: nombre_usuario
 *         schema:
 *           type: string
 *       - in: query
 *         name: estatus
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Lista de usuarios filtrada correctamente
 *       400:
 *         description: No se proporcionó ningún filtro
 *       500:
 *         description: Error al realizar la búsqueda
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al obtener usuario
 *   put:
 *     summary: Actualizar un usuario
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Campos a actualizar
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al actualizar usuario
 *   delete:
 *     summary: Eliminar un usuario
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al eliminar usuario
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags:
 *       - Usuarios
 *     description: |
 *       Crea un nuevo usuario en el sistema.
 *       Requiere nombre de usuario, email, contraseña, rol y al menos un teléfono.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre_usuario
 *               - email
 *               - contraseña
 *               - rol
 *               - telefonos
 *             properties:
 *               nombre_usuario:
 *                 type: string
 *               email:
 *                 type: string
 *               contraseña:
 *                 type: string
 *               rol:
 *                 type: string
 *               telefonos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     tipo:
 *                       type: string
 *                     numero:
 *                       type: string
 *               estado:
 *                 type: boolean
 *               estatus:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Error de validación en el body
 *       500:
 *         description: Error al crear usuario
 */


// Rutas RESTful CRUD para usuarios
usuariosRouter.get('',authMiddlewareInstance.verifyToken, usuariosControllerInstance.getAll); 
usuariosRouter.get('/search',authMiddlewareInstance.verifyToken, usuariosControllerInstance.find);
usuariosRouter.get('/:id',authMiddlewareInstance.verifyToken, usuariosControllerInstance.getById);
usuariosRouter.post('', usuariosControllerInstance.create); 
usuariosRouter.put('/:id',authMiddlewareInstance.verifyToken, usuariosControllerInstance.update);
usuariosRouter.delete('/:id',authMiddlewareInstance.verifyToken, usuariosControllerInstance.delete);

export default usuariosRouter;