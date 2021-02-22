import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { productosDatos, productosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-mermelada',
  templateUrl: './mermelada.component.html',
  styles: []
})
export class MermeladaComponent implements OnInit {

  producto:any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private _productosService: productosService
  ) {}

  ngOnInit(): void {
    this._productosService.getProducto(this.activatedRoute.snapshot.params.id)
      .subscribe(respuesta => {
        this.producto = respuesta;
        console.log(respuesta);
      },
      (err) => {
        err="ERROR";
        console.log(err);
      } );
  }

  /*public anadirCesta(){
    this.router.navigate(['/compra', this.index]);
  }*/

}
