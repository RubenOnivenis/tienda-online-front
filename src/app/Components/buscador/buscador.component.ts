import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mermeladasDatos, MermeladasListaService } from 'src/app/services/mermeladas_lista.service';

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
    private _mermeladasListaService:MermeladasListaService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) {
    this.NUM_CARACTERES = 120;
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(parametros => {
      this.encontrarMermelada = this._mermeladasListaService.buscarMermelada(parametros["texto"]);
      this.textoBuscado = parametros["texto"];
      console.log(this.encontrarMermelada);
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
