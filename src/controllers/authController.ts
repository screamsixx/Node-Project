import { Request, Response } from 'express';
import { simpleResponse } from '../utils/simpleResponse';
import { authService } from '../services/authServices';

export class authController {

  login(req: Request, res: Response) {
    const { nombre_usuario, contraseña } = req.body;

    // 1️⃣ Validar que los campos necesarios están presentes
    if (!nombre_usuario || !contraseña) {
      return simpleResponse.error(
        req,
        res,
        'Se requieren los campos "nombre_usuario" y "contraseña"',
        400
      );
    }

    // 2️⃣ Llamar al servicio de autenticación
    authService.login(nombre_usuario, contraseña).subscribe({
      next: (usuarioConToken) => {
        // Autenticación exitosa
        simpleResponse.success(req, res, usuarioConToken, 200);
      },
      error: (err: Error) => {
        console.error('Error en el login:', err.message);

        // 3️⃣ Manejar errores específicos del servicio
        if (err.message.includes('Credenciales inválidas')) {
          // Si el servicio nos dice que las credenciales son incorrectas
          return simpleResponse.error(req, res, 'Credenciales inválidas', 401);
        }

        // Para cualquier otro tipo de error
        simpleResponse.error(req, res, 'Error en la autenticación', 500);
      }
    });
  }
}