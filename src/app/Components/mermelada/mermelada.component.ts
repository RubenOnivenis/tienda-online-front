import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mermeladasDatos, MermeladasListaService } from 'src/app/services/mermeladas_lista.service';

@Component({
  selector: 'app-mermelada',
  templateUrl: './mermelada.component.html',
  styles: [
  ]
})
export class MermeladaComponent implements OnInit {

  mermelada!:mermeladasDatos;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _mermeladaListaService:MermeladasListaService
  ) {
    this.activatedRoute.params.subscribe(parametros => {
      this.mermelada = this._mermeladaListaService.getMermelada(parametros["id"]);
    })
   }

  ngOnInit(): void {
  }

}
