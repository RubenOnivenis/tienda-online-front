import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mermeladasDatos, productosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-mermeladas',
  templateUrl: './mermeladas.component.html',
  styles: []
})
export class MermeladasComponent implements OnInit {

  mermeladas!:mermeladasDatos[];
  
  constructor(
    private _producosService:productosService
  ) { }

  ngOnInit(): void {
    this.mermeladas = this._producosService.getMermeladasDatos();
  }

  /*public verMermelada(id:number){
    //this.router.navigate(['/mermelada', id]);
    console.log(this._mermeladasListaService.getMermelada(id));
  }*/

}
