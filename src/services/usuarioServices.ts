import { Collection, ObjectId } from 'mongodb';
import { connectToDatabase } from '../utils/mongodbConnection';
import { Usuario } from '../models/usuario';
import { Observable, from, throwError } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

export class usuariosService {
  
  // Gets a reference to the 'usuarios' collection wrapped in an Observable
  private static getCollection(): Observable<Collection<Usuario>> {
    return from(connectToDatabase()).pipe(
      map(db => db.collection<Usuario>('usuarios'))
    );
  }

  // Gets all users
  public static getAll(): Observable<Usuario[]> {
    return this.getCollection().pipe(
      mergeMap(collection => from(collection.find({}).toArray())),
      catchError(error => {
        console.error('Error getting all users:', error);
        return throwError(() => new Error('Error getting all users'));
      })
    );
  }

  // Finds users based on a query
  public static find(query: object): Observable<Usuario[]> {
    return this.getCollection().pipe(
      mergeMap(collection => from(collection.find(query).toArray())),
      catchError(error => {
        console.error('Error finding users:', error);
        return throwError(() => new Error('Error finding users'));
      })
    );
  }

  // Gets a single user by ID
  public static getById(id: string): Observable<Usuario | null> {
    try {
      const objectId = new ObjectId(id);
      return this.getCollection().pipe(
        mergeMap(collection => from(collection.findOne({ _id: objectId }))),
        catchError(error => {
          console.error('Error getting user by ID:', error);
          return throwError(() => new Error('Error getting user by ID'));
        })
      );
    } catch (error) {
      return throwError(() => new Error('Invalid ID format'));
    }
  }

  // Creates a new user
  public static create(usuario: Omit<Usuario, '_id'>): Observable<Usuario> {
  return this.getCollection().pipe(
    mergeMap(collection =>
      from(collection.findOne({ nombre_usuario: usuario.nombre_usuario })).pipe(
        mergeMap(existingUser => {
          if (existingUser) {
            // Si ya existe un usuario con ese nombre, lanzar error
            return throwError(() => new Error(`El nombre de usuario "${usuario.nombre_usuario}" ya existe`));
          }
          // Si no existe, insertar
          return from(collection.insertOne(usuario as any)).pipe(
            map(result => ({ _id: result.insertedId, ...usuario } as Usuario))
          );
        })
      )
    ),
    catchError(error => {
      console.error('Error creating user:', error);
      return throwError(() => new Error(error.message || 'Error creating user'));
    })
  );
}

 // Updates an existing user by ID
public static update(id: string, updates: Partial<Usuario>): Observable<Usuario | null> {
  try {
    const objectId = new ObjectId(id);
    return this.getCollection().pipe(
      mergeMap(collection => from(collection.findOneAndUpdate(
        { _id: objectId },
        { $set: updates },
        { returnDocument: 'after' }
      ))),
      map(updatedDocument => {
        // The updatedDocument is either a Usuario or null.
        // No need for a 'value' property.
        if (updatedDocument) {
          return updatedDocument;
        }
        return null;
      }),
      catchError(error => {
        console.error('Error updating user:', error);
        return throwError(() => new Error('Error updating user'));
      })
    );
  } catch (error) {
    return throwError(() => new Error('Invalid ID format'));
  }
}

  // Deletes a user by ID
  public static delete(id: string): Observable<boolean> {
    try {
      const objectId = new ObjectId(id);
      return this.getCollection().pipe(
        mergeMap(collection => from(collection.deleteOne({ _id: objectId }))),
        map(result => result.deletedCount === 1),
        catchError(error => {
          console.error('Error deleting user:', error);
          return throwError(() => new Error('Error deleting user'));
        })
      );
    } catch (error) {
      return throwError(() => new Error('Invalid ID format'));
    }
  }
}