import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface comentariosDatos{
  id_comentario?:number,
  comentario:string,
  id_producto:number,
  id_usuario:number
}

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  API_URI = 'http://localhost:8080/api';

  constructor(
    private http:HttpClient
  ) { }

  comentariosProducto(id_producto:number){
    return this.http.get(`${this.API_URI}/comentariosDatos/${id_producto}`);
  }

  anadirComentario(comentario: comentariosDatos){
    return this.http.post(`${this.API_URI}/comentarios`, comentario);
  }
  
}
