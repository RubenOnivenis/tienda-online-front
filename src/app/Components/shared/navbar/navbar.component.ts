import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  usuario: any = {};

  constructor(
    private router:Router,
    private _usuarioService: UsuarioService
  ) { 
    _usuarioService.getUsuario(1)
      .subscribe((respuesta => {
        this.usuario = respuesta;
    }))
  }

  ngOnInit(): void {}

  public buscarMermelada(buscarTexto:string){
    this.router.navigate(["/buscar", buscarTexto]);
  }

}
