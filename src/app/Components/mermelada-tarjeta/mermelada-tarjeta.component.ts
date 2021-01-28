import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mermeladasDatos } from 'src/app/services/mermeladas-lista/mermeladas_lista.service';

@Component({
  selector: 'app-mermelada-tarjeta',
  templateUrl: './mermelada-tarjeta.component.html',
  styles: [
  ]
})
export class MermeladaTarjetaComponent implements OnInit {

  @Input() mermelada!:mermeladasDatos;
  NUM_CARACTERES:number;
  @Input() index!:number|undefined;

  constructor(
    private router:Router
  ) { 
    this.NUM_CARACTERES = 120;
  }

  ngOnInit(): void {}

  public verMermelada(){
    this.router.navigate(['/mermelada', this.index]);
  }

  public puntos_suspensivos():string{
    if(this.mermelada.descr.length > this.NUM_CARACTERES) return "...";
    return "";
  }

}
