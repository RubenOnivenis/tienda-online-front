import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface encargosDatos{
  id_encargo?:number,
  id_usuario:number,
  precio_encargo:number,
  fch_pedido:Date,
  fch_encargo_enviado:Date,
  fch_encargo_recibido:Date
}
export interface productos_x_encargosDatos{
  id?:number,
  id_encargo:number,
  id_producto:number,
  cantidad:number,
  precio_producto:number
}

@Injectable({
  providedIn: 'root'
})
export class EncargosService {

  API_URI = 'http://localhost:8080/api';

  constructor(
    private http:HttpClient
  ) { }

  //ENCARGOS  

  getEncargos(){
    return this.http.get(`${this.API_URI}/encargos`);
  }

  getEncargo(id_encargo:number){
    return this.http.get(`${this.API_URI}/encargos/${id_encargo}`);
  }

  aniadirEncargo(encargo: encargosDatos){
    return this.http.post(`${this.API_URI}/encargos`, encargo);
  }

  borrarEncargo(id_encargo:number){
    return this.http.delete(`${this.API_URI}/encargos/${id_encargo}`);
  }

  //PRODUCTO_X_ENCARGO

  getProducto_x_encargo(){
    return this.http.get(`${this.API_URI}/productos_x_encargos`);
  }

  getProducto_x_Encargo(id: number){
    return this.http.get(`${this.API_URI}/productos_x_encargos/${id}`);
  }

  aniadirProducto_x_encargo(producto_x_encargo: productos_x_encargosDatos){
    return this.http.post(`${this.API_URI}/productos_x_encargos`, producto_x_encargo);
  }

  borrarProducto_x_encargo(id: number){
    return this.http.delete(`${this.API_URI}/productos_x_encargos/${id}`);
  }

}
