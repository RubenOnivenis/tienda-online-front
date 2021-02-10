import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mermeladasDatos, MermeladasListaService } from 'src/app/services/mermeladas_lista.service';

@Component({
  selector: 'app-mermelada',
  templateUrl: './mermelada.component.html',
  styles: [
  ]
})
export class MermeladaComponent implements OnInit {

  @Input() mermelada!:mermeladasDatos;
  //@Input() index!:number | undefined;

  constructor(
    //private router:Router,
    private activatedRoute: ActivatedRoute,
    private _mermeladaListaService:MermeladasListaService
  ) {
    this.activatedRoute.params.subscribe(parametros => {
      this.mermelada = this._mermeladaListaService.getMermelada(parametros["id"]);
    })
   }

  ngOnInit(): void {
  }

  /*public anadirCesta(){
    this.router.navigate(['/compra', this.index]);
  }*/

}
