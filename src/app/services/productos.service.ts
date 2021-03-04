import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


export interface productosDatos {
    id?:number,
    nombre:string,
    precio:number,
    imagen?:string,
    descr:string,
    diasConsumicion:number,
    ingredientes:string,
    imagen_oferta?:string
}

@Injectable({
    providedIn: 'root'
})
export class productosService
{
    API_URI = 'http://localhost:8080/api';

    constructor(
        private http:HttpClient
    ){}

    getProductos(){
        return this.http.get(`${this.API_URI}/productos`);
    }

    getProducto(id: number){
        return this.http.get(`${this.API_URI}/producto/${id}`);
    }

    buscador(nombre:String){
        console.log(`${this.API_URI}/producto/nombre/${nombre}`);
        return this.http.get(`${this.API_URI}/producto/nombre/${nombre}`);
    }

}