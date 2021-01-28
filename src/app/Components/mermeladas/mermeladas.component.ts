import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mermeladasDatos, MermeladasListaService } from 'src/app/services/mermeladas-lista/mermeladas_lista.service';

@Component({
  selector: 'app-mermeladas',
  templateUrl: './mermeladas.component.html',
  styles: []
})
export class MermeladasComponent implements OnInit {

  mermeladas!:mermeladasDatos[];
  
  constructor(
    private _mermeladasListaService:MermeladasListaService,
  ) { }

  ngOnInit(): void {
    this.mermeladas = this._mermeladasListaService.getMermeladasDatos();
  }

  public verMermelada(id:number){
    //this.router.navigate(['/mermelada', id]);
    console.log(this._mermeladasListaService.getMermelada(id));
  }

}
