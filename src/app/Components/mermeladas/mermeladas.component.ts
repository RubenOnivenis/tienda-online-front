import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { productosDatos, productosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-mermeladas',
  templateUrl: './mermeladas.component.html',
  styles: []
})
export class MermeladasComponent implements OnInit {

  productos: any [] = [];
  
  constructor(
    private _productosService:productosService
  ) { }

  ngOnInit(): void {
    this._productosService.getProductos()
      .subscribe( (productos:any) => {
        this.productos = productos;
      } )
  }

}
