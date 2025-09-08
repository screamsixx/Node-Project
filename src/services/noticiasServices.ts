import { Observable, from, throwError } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";
require("dotenv").config();
import { NewsApiResponse } from "../models/newsApiResponse";

export class NoticiasServices {
  private static readonly API_KEY: string = process.env.API_NEWS_KEY as string;
  private static readonly API_URL: string = process.env.URL_API_NEWS as string;

  public static getNoticiasCrypto(): Observable<any[]> {
    // Validación para asegurar que las variables de entorno están cargadas
    if (!this.API_KEY || !this.API_URL) {
      return throwError(
        () =>
          new Error(
            "La clave de la API o la URL no se encontraron en el archivo .env."
          )
      );
    }

    const query = "crypto";
    const url = `${this.API_URL}/v2/everything?q=${encodeURIComponent(
      query
    )}&apiKey=${this.API_KEY}&pageSize=10&language=es`;
    // `from` convierte la Promesa de `fetch` en un Observable
    return from(fetch(url)).pipe(
      // `mergeMap` procesa la respuesta HTTP y la convierte a JSON
      mergeMap((response) => {
        // Si la respuesta no es exitosa, se lanza un error inmediatamente
        if (!response.ok) {
          return throwError(
            () => new Error(`Error HTTP! estado: ${response.status}`)
          );
        }
        // Se convierte la respuesta a JSON
        return from(response.json() as Promise<NewsApiResponse>);
      }),
      // `map` ahora solo se encarga de extraer los artículos de la respuesta válida
      map((data) => {
        if (data.status !== "ok") {
          // Manejo del error de la API, en caso de que la API responda con un status 'error'
          console.error("API response status not OK:", data);
          throw new Error("El estado de la respuesta de la API no es OK.");
        }
        return data.articles;
      }),
      // `catchError` intercepta cualquier error en la cadena de Observables
      catchError((error) => {
        console.error("Error al obtener noticias:", error);
        // Aquí podrías agregar lógica para mostrar mensajes de error más específicos
        return throwError(
          () =>
            new Error(
              "No se pudieron recuperar las noticias. Por favor, inténtelo de nuevo más tarde."
            )
        );
      })
    );
  }
}
