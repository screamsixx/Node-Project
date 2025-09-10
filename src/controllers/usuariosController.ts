import { Request, Response } from 'express';
import { usuariosService } from '../services/usuariosServices';
import { simpleResponse } from '../utils/simpleResponse';
import { Usuario } from '../models/usuario';

export class usuariosController {

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

  

  find(req: Request, res: Response) {
    const queryRaw = req.query;
    if (!queryRaw.rol && !queryRaw.email && !queryRaw.nombre_usuario && queryRaw.estatus === undefined) {
      return simpleResponse.error(req,res,'Debe proporcionarse al menos un filtro: rol, email, nombre_usuario o estatus',400);
    }
    const query: any = {};
    if (queryRaw.rol) query.rol = queryRaw.rol;
    if (queryRaw.email) query.email = queryRaw.email;
    if (queryRaw.nombre_usuario) query.nombre_usuario = queryRaw.nombre_usuario;
    if (queryRaw.estatus !== undefined) query.estatus = queryRaw.estatus === 'true';

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


  create(req: Request, res: Response) {
    if (!req.is('application/json')) { return simpleResponse.error(req, res, 'Se requiere un body en formato JSON', 400); }
    const body = req.body;
    if (!body || Object.keys(body).length === 0) { return simpleResponse.error(req, res, 'El body no puede estar vacío', 400); }
    const requiredFields: (keyof Usuario)[] = ['nombre_usuario', 'email', 'contraseña', 'rol', 'telefonos'];
    const missingFields = requiredFields.filter(field => !(field in body));
    if (missingFields.length > 0) { return simpleResponse.error(req, res, `Faltan campos obligatorios: ${missingFields.join(', ')}`, 400); }
    if (typeof body.nombre_usuario !== 'string' || typeof body.email !== 'string' || typeof body.contraseña !== 'string' || typeof body.rol !== 'string') { return simpleResponse.error(req, res, 'nombre_usuario, email, contraseña y rol deben ser strings', 400); }
    if (!Array.isArray(body.telefonos) || body.telefonos.length === 0) { return simpleResponse.error(req, res, 'El campo "telefonos" debe ser un arreglo y contener al menos un teléfono', 400); }
    for (const t of body.telefonos) { if (typeof t !== 'object' || typeof t.tipo !== 'string' || typeof t.numero !== 'string') { return simpleResponse.error(req, res, 'Cada teléfono debe ser un objeto con campos "tipo" y "numero" de tipo string', 400); } }
    body.ultimos_inicios_sesion = [];
    body.fecha_registro = new Date();
    if ('estado' in body && typeof body.estado !== 'boolean') { return simpleResponse.error(req, res, 'El campo "estado" debe ser booleano', 400); }
    if ('estatus' in body && typeof body.estatus !== 'boolean') { return simpleResponse.error(req, res, 'El campo "estatus" debe ser booleano', 400); }
    usuariosService.create(req.body).subscribe({
      next: (nuevoUsuario) => { simpleResponse.success(req, res, nuevoUsuario, 201); },
      error: (err: any) => {
        console.error('Error al crear usuario:', err);
        if (err.message && err.message.includes('ya existe')) { return simpleResponse.error(req, res, err.message, 400); }
        simpleResponse.error(req, res, err.message || 'Error al crear usuario', 500);
      }
    });
  }


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

