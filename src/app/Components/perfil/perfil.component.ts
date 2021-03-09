import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EncargosService } from 'src/app/services/encargos.service';
import { usuariosDatos, UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  usuario:any = {};
  encargos:any [] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private _usuariosService: UsuarioService,
    private _encargosService: EncargosService
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

}