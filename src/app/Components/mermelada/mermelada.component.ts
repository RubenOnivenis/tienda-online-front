import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CestaService } from 'src/app/services/cesta.service';
import { ComentariosService } from 'src/app/services/comentarios.service';
import { productosDatos, productosService } from 'src/app/services/productos.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mermelada',
  templateUrl: './mermelada.component.html',
  styles: []
})
export class MermeladaComponent implements OnInit {

  cestaProducto: any [] = [];
  cesta: any = {}
  producto: any = {};
  usuario: any = {};
  ocultar: boolean = true;
  comentarios: any [] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private _productosService: productosService,
    private _comentarioService:ComentariosService,
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
    this.verComentarios();
    this.ocultarBoton();
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

  ocultarBoton(){
    this._cestaService.productosCesta(1)
      .subscribe((respuesta: any) => {
        this.cestaProducto = respuesta;
        for(let productoCesta of this.cestaProducto){
          if(this.producto.id == productoCesta.id_producto){
            this.ocultar = false;
          }
        }
      })
  }

  cestaAniadir(){
    this.cestaRellenar();
    this._cestaService.aniadirCesta(this.cesta)
      .subscribe(respuesta=>{})
  }

  cestaRellenar(){
    this.cesta={
      id_cesta:1,
      id_producto:this.producto.id,
      id_usuario:1
    }
  }

  verComentarios(){
    this._comentarioService.comentariosProducto(this.activatedRoute.snapshot.params.id)
      .subscribe((respuesta:any) =>{
        this.comentarios = respuesta;
      })
  }

}
