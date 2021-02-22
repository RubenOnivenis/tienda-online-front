import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { productosDatos, productosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styles: [
  ]
})
export class CompraComponent implements OnInit {

  @Input() mermelada!:productosDatos;
  //NUM_CARACTERES:number;
  //@Input() index!:number | undefined;

  constructor(
    //private router:Router
    private activatedRoute:ActivatedRoute,
    private _productosService:productosService
  ) { 
    //this.NUM_CARACTERES = 120;
    this.activatedRoute.params.subscribe(parametros => {
      //this.mermelada = this._productosService.getProducto(parametros.id);
    })
  }

  ngOnInit(): void {}

  /*public puntos_suspensivos():string{
    if(this.mermelada.descr.length > this.NUM_CARACTERES) return "...";
    return "";
  }*/
}
