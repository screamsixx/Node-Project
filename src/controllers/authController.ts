import { Request, Response } from 'express';
import { simpleResponse } from '../utils/simpleResponse';
import { authService } from '../services/authServices';

export class authController {
  /**
   * @swagger
   * /auth/login:
   * post:
   * summary: Inicia sesión de usuario
   * description: >
   * Autentica a un usuario utilizando su nombre de usuario y contraseña.
   * Si las credenciales son correctas, devuelve el objeto completo del usuario
   * (excluyendo la contraseña) junto con un token JWT de acceso.
   * tags:
   * - Autenticación
   * requestBody:
   * required: true
   * content:
   * application/json:
   * schema:
   * type: object
   * required:
   * - nombre_usuario
   * - contraseña
   * properties:
   * nombre_usuario:
   * type: string
   * description: El nombre de usuario registrado.
   * example: admin
   * contraseña:
   * type: string
   * description: La contraseña del usuario.
   * format: password
   * example: admin123
   * responses:
   * 200:
   * description: Autenticación exitosa.
   * content:
   * application/json:
   * schema:
   * type: object
   * description: >
   * El objeto del usuario sin la contraseña y con un campo 'token' añadido.
   * allOf:
   * - $ref: '#/components/schemas/Usuario'
   * properties:
   * token:
   * type: string
   * example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   * 400:
   * description: Datos de entrada inválidos. Falta nombre_usuario o contraseña.
   * 401:
   * description: No autorizado. Las credenciales proporcionadas son incorrectas.
   * 500:
   * description: Error interno del servidor.
   */
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