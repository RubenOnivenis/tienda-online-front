import { Injectable } from "@angular/core";

export interface mermeladasDatos {
    id?:number,
    nombre:string,
    precio:number,
    imagen:string,
    descr:string,
    fecha_elaboracion?:string,
    dias_consumicion_preferente:number
    //puntuacion_media:number
}

@Injectable()
export class MermeladasListaService
{
    constructor(){}
    private mermeladaDato: mermeladasDatos[] = [
    {
        nombre:"Fresa",
        precio:2.80,
        imagen:"assets/img/fresa2.png",
        descr: "La mermelada de fresa tiene un sabor delicado, con dulzor natural, pues está hecha con fresas maduras en la mata, y cuyos aroma se aprecian cuando se consume pero que ya se atisban durante el proceso de elaboración.",
        fecha_elaboracion:"2021-01-26",
        dias_consumicion_preferente:123
    },
    {
        nombre:"Melocotón",
        precio:1.80,
        imagen:"assets/img/melocoton.png",
        descr:"Esta deliciosa mermelada extra realza el aroma y sabor natural del melocotón. Elaborada a mano de forma artesanal se presenta en trozos para obtener una apropiada textura, aroma y sabor. Exquisita para su consumo en estado natural, y como valioso ingrediente para realzar platos y sabrosos postres.",
        fecha_elaboracion:"2021-01-26",
        dias_consumicion_preferente:123
    },
    {
        nombre:"Mango",
        precio:2.90,
        imagen:"assets/img/mango.png",
        descr:"Es una mermelada elaborada con ingredientes 100% ecológicos y naturales, sin conservantes ni colorantes, con bajo contenido en azúcar preservando así el aroma y dulzor propio de la fruta que hacen que este producto alcance una calidad sorprendente disfrutando de su inigualable sabor.",
        fecha_elaboracion:"2021-01-26",
        dias_consumicion_preferente:123
    },
    {
        nombre:"Miel de floración de azahar de naranjo",
        precio:3.75,
        imagen:"assets/img/miel.png",
        descr:"Es muy aromática por la fragancia que agregan los naranjos, es suave al paladar por lo que es de sabor dulce; producida por las abejas a partir del néctar de las flores. Es de color ámbar claro, transparente cuando está líquida, con granulación fina y con una cristalización regular. Tiene propiedades antiespasmódicas y está recomendada como calmante.",
        fecha_elaboracion:"2021-01-26",
        dias_consumicion_preferente:123
    },
    {
        nombre:"Arándanos",
        precio:1.50,
        imagen:"assets/img/arandanos.png",
        descr:"Elaborada de manera artesanal, a la antigua usanza, con la mezcla de 50% de  fruta natural de primera calidad y 50% de azúcar. El método tradicional de elaboración le permite conservar sus características naturales con un sabor agradable.",
        fecha_elaboracion:"2021-01-26",
        dias_consumicion_preferente:123
    },
    {
        nombre:"Piña",
        precio:2.35,
        imagen:"assets/img/piña.png",
        descr:"Elaborada de manera artesanal, a la antigua usanza, con la mezcla de 50% de  fruta natural de primera calidad y 50% de azúcar. El método tradicional de elaboración le permite conservar sus características naturales con un sabor agradable.",
        fecha_elaboracion:"2021-01-26",
        dias_consumicion_preferente:123
    }
    ];

    getMermeladasDatos():mermeladasDatos[]{
        return this.mermeladaDato;
    }

    getMermelada(id:number):mermeladasDatos{
        return this.mermeladaDato[id];
    }

}