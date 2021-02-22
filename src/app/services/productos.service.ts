import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

var hoy:Date = new Date;
var maniana:Date = new Date(hoy.setDate(hoy.getDate()+1));

export interface productosDatos {
    id?:number,
    nombre:string,
    precio:number,
    imagen?:string,
    descr:string,
    fecha_elaboracion?:Date,
    dias_consumicion_preferente:number,
    ingredientes:string,
    imagen_oferta?:string
}

@Injectable({
    providedIn: 'root'
})
export class productosService
{
    API_URL = 'http://localhost:8080/api/';

    constructor(
        private http:HttpClient
    ){}

    getProductos(){
        return this.http.get(`${this.API_URL}/productos`);
    }

    getProducto(id: number){
        return this.http.get(`${this.API_URL}/producto/${id}`);
    }
    /*private mermeladaDato: mermeladasDatos[] = [
    {
        nombre:"Fresa",
        precio:2.80,
        imagen:"assets/img/fresa2.png",
        descr: "La mermelada de fresa tiene un sabor delicado, con dulzor natural, pues está hecha con fresas maduras en la mata, y cuyos aroma se aprecian cuando se consume pero que ya se atisban durante el proceso de elaboración.",
        fecha_elaboracion: maniana,
        dias_consumicion_preferente:70,
        ingredientes: "1 kg. de fresas maduras, 1 manzana y 1 limón (en ambos casos tienen mucha pectina y ayudará a espesar), 6 hojas de gelatina de 2 g cada una, edulcorante al gusto (debes usar un edulcorante que soporte altas temperaturas sin perder propiedades, yo solo he usado el Sucralin que tiene un sabor bastante conseguido aunque es carillo).",
        imagen_oferta: "assets/img/oferta.png"
    },
    {
        nombre:"Melocotón",
        precio:1.90,
        imagen:"assets/img/melocoton.png",
        descr:"Esta deliciosa mermelada extra realza el aroma y sabor natural del melocotón. Elaborada a mano de forma artesanal se presenta en trozos para obtener una apropiada textura, aroma y sabor. Exquisita para su consumo en estado natural, y como valioso ingrediente para realzar platos y sabrosos postres.",
        fecha_elaboracion: maniana,
        dias_consumicion_preferente:62,
        ingredientes: "1.5kg de melocotón ya pelado y cortado, 500g de azúcar, 15ml de zumo de limón, gelificante para mermeladas o pectina (opcional).",
        imagen_oferta: "assets/img/oferta.png"
    },
    {
        nombre:"Mango",
        precio:2.90,
        imagen:"assets/img/mango.png",
        descr:"Es una mermelada elaborada con ingredientes 100% ecológicos y naturales, sin conservantes ni colorantes, con bajo contenido en azúcar preservando así el aroma y dulzor propio de la fruta que hacen que este producto alcance una calidad sorprendente disfrutando de su inigualable sabor.",
        fecha_elaboracion: maniana,
        dias_consumicion_preferente:53,
        ingredientes: "1kg de mangos (preferiblemente dulces y maduros), 500g de azúcar, 1 taza de agua, zumo de un limón, envases de vidrio con tapa esterilizados (para envasar)."
    },
    {
        nombre:"Miel de floración de azahar",
        precio:3.75,
        imagen:"assets/img/miel.png",
        descr:"Es muy aromática por la fragancia que agregan los naranjos, es suave al paladar por lo que es de sabor dulce; producida por las abejas a partir del néctar de las flores. Es de color ámbar claro, transparente cuando está líquida, con granulación fina y con una cristalización regular. Tiene propiedades antiespasmódicas y está recomendada como calmante.",
        fecha_elaboracion: maniana,
        dias_consumicion_preferente:30,
        ingredientes: "Miel, 1.5kg y medio de azucar, 1L de agua, canela en rama, zumo de limón, dos cucharadas de té verde o cualquier otro, a elección, agua de azahar.",
        imagen_oferta: "assets/img/oferta.png",
    },
    {
        nombre:"Arándanos",
        precio:1.50,
        imagen:"assets/img/arandanos.png",
        descr:"Elaborada de manera artesanal, a la antigua usanza, con la mezcla de 50% de  fruta natural de primera calidad y 50% de azúcar. El método tradicional de elaboración le permite conservar sus características naturales con un sabor agradable.",
        fecha_elaboracion: maniana,
        dias_consumicion_preferente:40,
        ingredientes: "500g de arándanos azules, 250g de azúcar, el zumo de 1 limón."
    },
    {
        nombre:"Piña",
        precio:2.35,
        imagen:"assets/img/piña.png",
        descr:"Elaborada de manera artesanal, a la antigua usanza, con la mezcla de 50% de  fruta natural de primera calidad y 50% de azúcar. El método tradicional de elaboración le permite conservar sus características naturales con un sabor agradable.",
        fecha_elaboracion: maniana,
        dias_consumicion_preferente:43,
        ingredientes: "2 tazas de piña picada finamente, 4 cucharaditas de jugo de limón, 2 tazas de azúcar, 1 taza de agua."
    }
    ];*/

    /*getMermeladasDatos():mermeladasDatos[]{
        return this.mermeladaDato;
    }

    getMermelada(id:number):mermeladasDatos{
        return this.mermeladaDato[id];
    }*/

    /*public buscarMermelada(texto:string): mermeladasDatos[]{
        let encontrarMermelada: mermeladasDatos[] = [];
        texto = texto.toLowerCase();
        for(let i=0;i<this.mermeladaDato.length;i++){
            let mermelada = this.mermeladaDato[i];
            let nombre = mermelada.nombre.toLowerCase();
            if(nombre.indexOf(texto) >= 0){
                mermelada.id = i;
                encontrarMermelada.push(mermelada);
            }
        }
        return encontrarMermelada;
    }*/

}