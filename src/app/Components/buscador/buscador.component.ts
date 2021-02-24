import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { productosDatos, productosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styles: [
  ]
})
export class BuscadorComponent implements OnInit {

  productos: any [] = [];
  textoBuscado!:string;
  NUM_CARACTERES:number;

  constructor(
    private _productosService:productosService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) {
    this.NUM_CARACTERES = 120;
   }

  ngOnInit(): void {
    this._productosService.buscador(this.activatedRoute.snapshot.params.nombre)
      .subscribe((respuesta:any) => {
        this.productos = respuesta;
        console.log(respuesta);
      },
      (err) => {
        err = 'ERROR';
        console.log(err);
      });
  }

  public verMermelada(i:number){
    this.router.navigate(['/mermelada', i]);
  }

  public puntos_suspensivos(id:number):string{
    if(this.productos[id].descr.length > this.NUM_CARACTERES) return "...";
    return "";
  }
}
