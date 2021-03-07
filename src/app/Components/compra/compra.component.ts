import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CestaService } from 'src/app/services/cesta.service';
import { productosDatos, productosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styles: []
})
export class CompraComponent implements OnInit {


  productosCesta: any [] = [];
  precioTotal!:number;
  cantidadProducto!:number;

  constructor(
    private activatedRoute:ActivatedRoute,
    private _productosService:productosService,
    private _cestaService:CestaService
  ) { 
    this.activatedRoute.params.subscribe(parametros => {
    })
  }

  ngOnInit(): void {
    this.verProductosCesta();
  }
  
  verProductosCesta(){
    this._cestaService.productosCesta(1)
      .subscribe((respuesta:any) => {
        this.productosCesta = respuesta;
        this.calcularTotal();
      })
  }

  eliminarProducto(id_cesta:number){
    this._cestaService.borrarProductoCesta(id_cesta)
      .subscribe(respuesta => {
        this.verProductosCesta();
      })
  }

  calcularTotal(){
    this.cantidadProducto = parseInt((<HTMLInputElement>document.getElementsByName("cantidadProducto")[0]).value);
    this.precioTotal = 0;
    for(let precioProducto of this.productosCesta){
      if(parseFloat(precioProducto.precio_oferta)){
        this.precioTotal = this.precioTotal + parseFloat(precioProducto.precio_oferta)*this.cantidadProducto;
      }else{
        this.precioTotal = this.precioTotal + parseFloat(precioProducto.precio)*this.cantidadProducto;
      }
    }
    return this.precioTotal;
  }

}
