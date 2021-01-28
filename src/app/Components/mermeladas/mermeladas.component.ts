import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mermeladasDatos, MermeladasListaService } from 'src/app/services/mermeladas-lista/mermeladas_lista.service';

@Component({
  selector: 'app-mermeladas',
  templateUrl: './mermeladas.component.html',
  styles: []
})
export class MermeladasComponent implements OnInit {

  mermelada!:mermeladasDatos[];
  NUM_CARACTERES:number;

  constructor(
    private _mermeladasListaService:MermeladasListaService,
    private router:Router
  ) { 
    this.NUM_CARACTERES = 200;
  }

  ngOnInit(): void {
    this.mermelada = this._mermeladasListaService.getMermeladasDatos();
  }

  public verMermelada(id:number){
    this.router.navigate(['/mermelada', id]);
  }

  public puntos_suspensivos(id:number):string{
    if(this.mermelada[id].descr.length > this.NUM_CARACTERES) return "...";
    return "";
  }
}
