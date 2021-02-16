import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mermeladasDatos, productosService } from 'src/app/services/productos.service';

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
    private _productosService:productosService
  ) {
    this.activatedRoute.params.subscribe(parametros => {
      this.mermelada = this._productosService.getMermelada(parametros["id"]);
    })
   }

  ngOnInit(): void {
  }

  /*public anadirCesta(){
    this.router.navigate(['/compra', this.index]);
  }*/

}
