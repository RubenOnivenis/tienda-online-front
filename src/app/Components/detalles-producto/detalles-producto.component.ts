import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncargosService } from 'src/app/services/encargos.service';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styles: []
})
export class DetallesProductoComponent implements OnInit {

  detallesProductos: any [] = [];
  @Input() id_encargo!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _encargosService:EncargosService,
  ) { }

  ngOnInit(): void {
    this._encargosService.detallesProducto(this.id_encargo)
      .subscribe((respuesta:any) => {
        this.detallesProductos = respuesta;
      })
  }

}
