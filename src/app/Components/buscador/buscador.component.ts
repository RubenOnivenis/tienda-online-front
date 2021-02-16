import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mermeladasDatos, productosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styles: [
  ]
})
export class BuscadorComponent implements OnInit {

  encontrarMermelada!:mermeladasDatos[];
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
    this.activatedRoute.params.subscribe(parametros => {
      this.encontrarMermelada = this._productosService.buscarMermelada(parametros["texto"]);
      this.textoBuscado = parametros["texto"];
    })
  }

  public verMermelada(i:number){
    this.router.navigate(['/mermelada', i]);
  }

  public puntos_suspensivos(id:number):string{
    if(this.encontrarMermelada[id].descr.length > this.NUM_CARACTERES) return "...";
    return "";
  }
}
