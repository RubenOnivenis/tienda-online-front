import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EncargosService } from 'src/app/services/encargos.service';
import { usuariosDatos, UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})

export class PerfilComponent implements OnInit {

  usuario:any = {};
  imagen_seleccionada:any;
  encargos:any [] = [];
  imagen:any;
  datosRecibidosImg: any;
  base64data: any;
  imagenConvertida: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _usuariosService: UsuarioService,
    private _encargosService: EncargosService,
    private http:HttpClient,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.getUsuario();
    this.productosEncargos();
  }

  getUsuario(){
    this._usuariosService.getUsuario(this.activatedRoute.snapshot.params.id)
      .subscribe(respuesta => {
        this.usuario = respuesta;
      },
      (err) => {
        err="ERROR";
        console.log(err);
      })
  }

  productosEncargos(){
    this._encargosService.getEncargo(this.activatedRoute.snapshot.params.id)
      .subscribe((respuesta:any) => {
        this.encargos = respuesta;
      })
  }

  /*detallesProducto(){
    this._encargosService.detallesProducto(this.encargos.id_encargo)
      .subscribe((respuesta:any) => {
        this.detallesProductos = respuesta;
      })
  }*/

}