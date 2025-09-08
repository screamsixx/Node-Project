import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { catchError, map, Observable, of } from "rxjs";

require("dotenv").config();

const secret = process.env.JWT_SECRET?.toString() || "your_default_secret";

export class AuthMiddleware {
  constructor() {}

  // Arrow function para crear token
  public createToken = (username: string): Observable<string> => {
    return of(username).pipe(
      map((user) => {
        const payload = { username: user };
        const token = jwt.sign(payload, secret, { expiresIn: "10h" });
        return token;
      })
    );
  };

  // Arrow function para validar token
  public isTokenValid = (token: string): Observable<boolean> => {
    return of(token).pipe(
      map((t) => {
        jwt.verify(t, secret); // Esto lanza error si es inválido
        return true;
      }),
      catchError((err) => {
        console.error("Token inválido o expirado:", err.message);
        return of(false);
      })
    );
  };

  // Arrow function para middleware de verificación
  public verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    console.log('\n=== INICIO VERIFICACIÓN ===');
    console.log('Authorization Header:', authHeader);
    console.log('Token extraído:', token);

    if (!token) {
      console.log('ERROR: No se encontró token');
      return res.status(401).json({ message: "No autorizado" });
    }

    this.isTokenValid(token).subscribe({
      next: (isValid) => {
        console.log('Resultado isValid:', isValid);
        if (isValid) {
          const clientIp = req.socket.remoteAddress;
          console.log("Token VÁLIDO - IP:" + clientIp);
          next();
        } else {
          console.log('Token INVÁLIDO (pero sin error)');
          return res.status(403).json({ message: "Prohibido" });
        }
      },
      error: (err) => {
        console.error('Error en verificación:', err);
        return res.status(403).json({ 
          message: "Prohibido",
          error: err.message 
        });
      }
    });
  };
}