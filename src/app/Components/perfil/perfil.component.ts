import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { usuariosDatos, UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  usuario:any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private _usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this._usuarioService.getUsuario(this.activatedRoute.snapshot.params.id)
      .subscribe(respuesta => {
        this.usuario = respuesta;
      },
      (err) => {
        err="ERROR";
        console.log(err);
      })
  }
}