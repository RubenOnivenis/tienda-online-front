import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CestaService } from 'src/app/services/cesta.service';
import { productosDatos, productosService } from 'src/app/services/productos.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mermelada',
  templateUrl: './mermelada.component.html',
  styles: []
})
export class MermeladaComponent implements OnInit {

  cesta: any = {}
  producto: any = {};
  usuario: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private _productosService: productosService,
    private _cestaService: CestaService,
    private _usuarioService: UsuarioService
  ) {
    _usuarioService.getUsuario(1)
      .subscribe((respuesta => {
        this.usuario = respuesta;
    }))
  }

  ngOnInit(): void {
    this.getProducto();
    this.getCesta();
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

  getCesta(){
    this._cestaService.cestaFila(this.activatedRoute.snapshot.params.id)
      .subscribe(respuesta => {
        this.cesta = respuesta;
        this.comprobarCesta();
      })
  }

  comprobarCesta(){
    console.log(this.cesta);
    console.log(this.usuario.id_usuario);
    if((this.cesta.id_producto == this.activatedRoute.snapshot.params.id) && (this.usuario.id_usuario == 1)){
      let esconderBoton = <HTMLFormElement>document.getElementById('anadirCestaBoton');
      esconderBoton.style.display='none';
    }
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
