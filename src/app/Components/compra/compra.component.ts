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

  productoCesta: any [] = [];
  @Input() mermelada!:productosDatos;

  constructor(
    private activatedRoute:ActivatedRoute,
    private _productosService:productosService,
    private _cestaService:CestaService
  ) { 
    this.activatedRoute.params.subscribe(parametros => {
      //this.mermelada = this._productosService.getProducto(parametros.id);
    })
  }

  ngOnInit(): void {
    this.verProductosCesta();
  }
  
  verProductosCesta(){
    this._cestaService.productosCesta()
      .subscribe((respuesta:any) => {
        this.productoCesta = respuesta;
      })
  }

}
