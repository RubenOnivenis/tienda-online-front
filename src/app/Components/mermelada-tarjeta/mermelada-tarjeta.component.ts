import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { productosDatos } from 'src/app/services/productos.service';

@Component({
  selector: 'app-mermelada-tarjeta',
  templateUrl: './mermelada-tarjeta.component.html',
  styles: []
})
export class MermeladaTarjetaComponent implements OnInit {

  @Input() producto!:productosDatos;
  NUM_CARACTERES:number;
  @Input() index!:number | undefined;

  constructor(
    private router:Router
  ) { 
    this.NUM_CARACTERES = 120;
  }

  ngOnInit(): void {}

  public verProducto(){
    this.router.navigate(['/mermelada', this.index]);
  }

  public puntos_suspensivos():string{
    if(this.producto.descr.length > this.NUM_CARACTERES) return "...";
    return "";
  }

}
