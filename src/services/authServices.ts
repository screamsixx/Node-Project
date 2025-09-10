import { Collection } from 'mongodb';
import { connectToDatabase } from '../utils/mongodbConnection';
import { Usuario } from '../models/usuario';
import { Observable, from, throwError } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AuthMiddleware } from '../utils/authMiddleware';

export class authService {
  // Instancia de AuthMiddleware para usar sus métodos
  private static authMiddleware = new AuthMiddleware();

  /**
   * Obtiene una referencia a la colección 'usuarios' envuelta en un Observable.
   */
  private static getCollection(): Observable<Collection<Usuario>> {
    return from(connectToDatabase()).pipe(
      map(db => db.collection<Usuario>('usuarios'))
    );
  }

  /**
   * Autentica a un usuario y devuelve el objeto Usuario sin la contraseña
   * y con un token JWT añadido.
   * @param nombre_usuario El nombre de usuario para la autenticación.
   * @param contraseña La contraseña del usuario.
   * @returns Un Observable que emite el objeto Usuario modificado.
   */
  public static login(nombre_usuario: string, contraseña: string): Observable<Usuario> {
    return this.getCollection().pipe(
      mergeMap(collection => 
        // Busca al usuario por su nombre de usuario
        from(collection.findOne({ nombre_usuario }))
      ),
      mergeMap(usuario => {
        // Si el usuario no existe o la contraseña no coincide, lanza un error.
        if (!usuario || usuario.contraseña !== contraseña) {
          return throwError(() => new Error('Credenciales inválidas'));
        }

        // Si las credenciales son correctas, crea el token
        return this.authMiddleware.createToken(usuario.nombre_usuario).pipe(
          map(token => {
            // Desestructuramos el objeto para excluir la contraseña
            const { contraseña, ...usuarioParaDevolver } = usuario;
            
            // Añadimos el token directamente al objeto de usuario
            // Esto es posible gracias a la firma [key: string]: any; en la interfaz
            usuarioParaDevolver.token = token;
            
            return usuarioParaDevolver as Usuario;
          })
        );
      }),
      catchError(error => {
        // Captura cualquier error
        console.error('Error durante el inicio de sesión:', error);
        return throwError(() => new Error(error.message || 'Error en el servidor durante la autenticación'));
      })
    );
  }
}