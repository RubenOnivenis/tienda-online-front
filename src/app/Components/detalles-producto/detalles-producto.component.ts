import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncargosService } from 'src/app/services/encargos.service';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styles: []
})
export class DetallesProductoComponent implements OnInit {

  detallesProductos: any [] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private _encargosService:EncargosService
  ) { }

  ngOnInit(): void {
    this._encargosService.detallesProducto(this.activatedRoute.snapshot.params.id)
      .subscribe((respuesta:any) => {
        this.detallesProductos = respuesta;
        console.log(respuesta);
      })
  }

}
