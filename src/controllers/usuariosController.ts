import { Request, Response } from 'express';
import { usuariosService } from '../services/usuarioServices';
import { simpleResponse } from '../utils/simpleResponse';
import { Usuario } from '../models/usuario';

export class usuariosController {
  /**
   * @swagger
   * /usuarios:
   *   get:
   *     summary: Obtiene todos los usuarios
   *     description: Devuelve una lista de todos los usuarios registrados.
   *     tags:
   *       - Usuarios
   *     responses:
   *       200:
   *         description: Lista de usuarios obtenida exitosamente.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Usuario'
   *       500:
   *         description: Error del servidor.
   */
  getAll(req: Request, res: Response) {
    usuariosService.getAll().subscribe({
      next: usuarios => {
        simpleResponse.success(req, res, usuarios);
      },
      error: err => {
        console.error('Error al obtener usuarios:', err);
        simpleResponse.error(req, res, 'Error al obtener usuarios', 500);
      }
    });
  }

  
/**
 * @swagger
 * /usuarios/search:
 *   get:
 *     summary: Busca usuarios por criterios específicos
 *     description: >
 *       Permite buscar uno o varios usuarios que coincidan con los criterios de la consulta.
 *       **Al menos un parámetro de búsqueda debe ser proporcionado**.
 *       Ejemplo: /usuarios/search?rol=admin&estatus=true
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: query
 *         name: rol
 *         schema:
 *           type: string
 *         description: Filtra por el rol del usuario (ej. 'admin' o 'general').
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filtra por email exacto del usuario.
 *       - in: query
 *         name: nombre_usuario
 *         schema:
 *           type: string
 *         description: Filtra por nombre de usuario exacto o parcial.
 *       - in: query
 *         name: estatus
 *         schema:
 *           type: boolean
 *         description: Filtra por el estatus del usuario (true = activo, false = inactivo).
 *     responses:
 *       200:
 *         description: Resultados de búsqueda obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: "Debe proporcionarse al menos un filtro: rol, email, nombre_usuario o estatus."
 *       500:
 *         description: Error del servidor.
 */

find(req: Request, res: Response) {
  const queryRaw = req.query;
  // Validación: al menos un filtro obligatorio
  if (!queryRaw.rol && !queryRaw.email && !queryRaw.nombre_usuario && queryRaw.estatus === undefined) {
    return simpleResponse.error(
      req,
      res,
      'Debe proporcionarse al menos un filtro: rol, email, nombre_usuario o estatus',
      400
    );
  }
  // Construir query
  const query: any = {};
  if (queryRaw.rol) query.rol = queryRaw.rol;
  if (queryRaw.email) query.email = queryRaw.email;
  if (queryRaw.nombre_usuario) query.nombre_usuario = queryRaw.nombre_usuario;
  if (queryRaw.estatus !== undefined) query.estatus = queryRaw.estatus === 'true';
  // Llamada al service
  usuariosService.find(query).subscribe({
    next: usuarios => {
      simpleResponse.success(req, res, usuarios);
    },
    error: err => {
      console.error('Error al realizar la búsqueda:', err);
      simpleResponse.error(req, res, 'Error al realizar la búsqueda', 500);
    }
  });
}


  /**
   * @swagger
   * /usuarios/{id}:
   *   get:
   *     summary: Obtiene un usuario por ID
   *     description: Devuelve un solo usuario por su ID.
   *     tags:
   *       - Usuarios
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID del usuario.
   *     responses:
   *       200:
   *         description: Usuario obtenido exitosamente.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Usuario'
   *       404:
   *         description: Usuario no encontrado.
   *       500:
   *         description: Error del servidor.
   */
  getById(req: Request, res: Response) {
    usuariosService.getById(req.params.id).subscribe({
      next: usuario => {
        if (!usuario) {
          return simpleResponse.error(req, res, 'Usuario no encontrado', 404);
        }
        simpleResponse.success(req, res, usuario);
      },
      error: err => {
        console.error('Error al obtener usuario:', err);
        simpleResponse.error(req, res, 'Error al obtener usuario', 500);
      }
    });
  }


/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crea un nuevo usuario
 *     description: >
 *       Crea un nuevo usuario con los datos proporcionados.
 *       - Se requiere un body en formato JSON.
 *       - Campos obligatorios: nombre_usuario, email, contraseña, rol, telefonos (al menos un teléfono válido con tipo y numero).
 *       - ultimos_inicios_sesion se inicializa vacío automáticamente.
 *       - fecha_registro se asigna automáticamente con la fecha actual.
 *       - Campos opcionales: estado (booleano), estatus (booleano).
 *     tags:
 *       - Usuarios
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
 *                 example: admin
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               contraseña:
 *                 type: string
 *                 example: admin123
 *               rol:
 *                 type: string
 *                 example: admin
 *               telefonos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - tipo
 *                     - numero
 *                   properties:
 *                     tipo:
 *                       type: string
 *                       example: movil
 *                     numero:
 *                       type: string
 *                       example: "+521234567890"
 *               estado:
 *                 type: boolean
 *                 example: true
 *               estatus:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: >
 *           Datos de usuario inválidos. 
 *           - Body no enviado o no es JSON. 
 *           - Faltan campos obligatorios. 
 *           - Telefonos vacíos o mal formados. 
 *           - Tipo de dato inválido en campos.
 *       500:
 *         description: Error al crear usuario.
 */

create(req: Request, res: Response) {
    // 1️⃣ Validar que el body sea JSON
    if (!req.is('application/json')) {
      return simpleResponse.error(req, res, 'Se requiere un body en formato JSON', 400);
    }

    const body = req.body;

    // 2️⃣ Validar que el body no esté vacío
    if (!body || Object.keys(body).length === 0) {
      return simpleResponse.error(req, res, 'El body no puede estar vacío', 400);
    }

    // 3️⃣ Campos obligatorios
    const requiredFields: (keyof Usuario)[] = [
      'nombre_usuario',
      'email',
      'contraseña',
      'rol',
      'telefonos'
    ];

    const missingFields = requiredFields.filter(field => !(field in body));
    if (missingFields.length > 0) {
      return simpleResponse.error(
        req,
        res,
        `Faltan campos obligatorios: ${missingFields.join(', ')}`,
        400
      );
    }

    // 4️⃣ Validar tipos básicos
    if (typeof body.nombre_usuario !== 'string') {
      return simpleResponse.error(req, res, 'El campo "nombre_usuario" debe ser un string', 400);
    }
    if (typeof body.email !== 'string') {
      return simpleResponse.error(req, res, 'El campo "email" debe ser un string', 400);
    }
    if (typeof body.contraseña !== 'string') {
      return simpleResponse.error(req, res, 'El campo "contraseña" debe ser un string', 400);
    }
    if (typeof body.rol !== 'string') {
      return simpleResponse.error(req, res, 'El campo "rol" debe ser un string', 400);
    }

    // 5️⃣ Validar telefonos
    if (!Array.isArray(body.telefonos) || body.telefonos.length === 0) {
      return simpleResponse.error(
        req,
        res,
        'El campo "telefonos" debe ser un arreglo y contener al menos un teléfono',
        400
      );
    }

    for (const t of body.telefonos) {
      if (typeof t !== 'object' || typeof t.tipo !== 'string' || typeof t.numero !== 'string') {
        return simpleResponse.error(
          req,
          res,
          'Cada teléfono debe ser un objeto con campos "tipo" y "numero" de tipo string',
          400
        );
      }
    }

    // 6️⃣ Inicializamos ultimos_inicios_sesion vacío
    body.ultimos_inicios_sesion = [];

    // 7️⃣ Ignoramos fecha_registro enviada y asignamos fecha actual
    body.fecha_registro = new Date();

    // 8️⃣ Campos opcionales booleanos
    if ('estado' in body && typeof body.estado !== 'boolean') {
      return simpleResponse.error(req, res, 'El campo "estado" debe ser booleano', 400);
    }
    if ('estatus' in body && typeof body.estatus !== 'boolean') {
      return simpleResponse.error(req, res, 'El campo "estatus" debe ser booleano', 400);
    }

   usuariosService.create(req.body).subscribe({
    next: (nuevoUsuario) => {
      simpleResponse.success(req, res, nuevoUsuario, 201);
    },
    error: (err: any) => {
      console.error('Error al crear usuario:', err);

      // Si es error de duplicado (nombre_usuario)
      if (err.message && err.message.includes('ya existe')) {
        return simpleResponse.error(req, res, err.message, 400);
      }

      // Otros errores
      simpleResponse.error(req, res, err.message || 'Error al crear usuario', 500);
    }
  });
  }

  /**
   * @swagger
   * /usuarios/{id}:
   *   put:
   *     summary: Actualiza un usuario
   *     description: Actualiza los datos de un usuario existente.
   *     tags:
   *       - Usuarios
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID del usuario a actualizar.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Usuario'
   *     responses:
   *       200:
   *         description: Usuario actualizado exitosamente.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Usuario'
   *       404:
   *         description: Usuario no encontrado.
   *       500:
   *         description: Error al actualizar usuario.
   */
  update(req: Request, res: Response) {
    usuariosService.update(req.params.id, req.body).subscribe({
      next: usuarioActualizado => {
        if (!usuarioActualizado) {
          return simpleResponse.error(req, res, 'Usuario no encontrado', 404);
        }
        simpleResponse.success(req, res, usuarioActualizado);
      },
      error: err => {
        console.error('Error al actualizar usuario:', err);
        simpleResponse.error(req, res, 'Error al actualizar usuario', 500);
      }
    });
  }

  /**
   * @swagger
   * /usuarios/{id}:
   *   delete:
   *     summary: Elimina un usuario
   *     description: Elimina un usuario por su ID.
   *     tags:
   *       - Usuarios
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID del usuario a eliminar.
   *     responses:
   *       200:
   *         description: Usuario eliminado exitosamente.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Usuario eliminado
   *       404:
   *         description: Usuario no encontrado.
   *       500:
   *         description: Error al eliminar usuario.
   */
  delete(req: Request, res: Response) {
    usuariosService.delete(req.params.id).subscribe({
      next: usuarioEliminado => {
        if (!usuarioEliminado) {
          return simpleResponse.error(req, res, 'Usuario no encontrado', 404);
        }
        simpleResponse.success(req, res, { message: 'Usuario eliminado' });
      },
      error: err => {
        console.error('Error al eliminar usuario:', err);
        simpleResponse.error(req, res, 'Error al eliminar usuario', 500);
      }
    });
  }
}
