import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface productosDatos {
  id_cesta?:number,
  id_usuario:number,
  id_producto:number,
}

@Injectable({
  providedIn: 'root'
})

export class CestaService {

  API_URI = 'http://localhost:8080/api';

  constructor(
    private http:HttpClient
  ) { }

  productosCesta(){
      return this.http.get(`${this.API_URI}/cesta`);
  }
}
