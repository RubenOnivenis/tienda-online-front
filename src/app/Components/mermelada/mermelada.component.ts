import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CestaService } from 'src/app/services/cesta.service';
import { productosDatos, productosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-mermelada',
  templateUrl: './mermelada.component.html',
  styles: []
})
export class MermeladaComponent implements OnInit {

  cesta: any = {}
  producto: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private _productosService: productosService,
    private _cestaService: CestaService
  ) {
    
  }

  ngOnInit(): void {
    this.getProducto();
  }

  getProducto(){
    this._productosService.getProducto(this.activatedRoute.snapshot.params.id)
      .subscribe(respuesta => {
        this.producto = respuesta;
      },
      (err) => {
        err="ERROR";
        console.log(err);
      } );
  }

  cestaAniadir(){
    this.cestaRellenar();
    this._cestaService.aniadirCesta(this.cesta)
      .subscribe(respuesta=>{
        
      })
  }

  cestaRellenar(){
    this.cesta={
      id_cesta:1,
      id_producto:this.producto.id,
      id_usuario:1
    }
  }

}
