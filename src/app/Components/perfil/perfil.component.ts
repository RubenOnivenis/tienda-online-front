import { HttpClient } from '@angular/common/http';
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

  id_encargo:number = 4;
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
    private http:HttpClient
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

  cambiarId(id_encargo:number){
    this.id_encargo = id_encargo;
  }

  cambioImagen(imagen: Event){
    //@ts-ignore
    this.imagen_seleccionada = imagen.target!.files[0]
    let lector = new FileReader();
    lector.readAsDataURL(this.imagen_seleccionada);
    lector.onload = event2 => {
      this.imagen = lector.result;
    }
  }

  subidaImagen(){
    let subirImg = new FormData();
    
    subirImg.append("imagen_usuario", this.imagen_seleccionada, this.imagen_seleccionada.name);
    this.http.patch(`http://localhost:8080/api/usuarios/1/foto`, subirImg)
      .subscribe(respuesta =>{
        this.datosRecibidosImg = respuesta;
        this.base64data = this.datosRecibidosImg.pic;
        this.imagenConvertida = "data:image/*;base64"+this.base64data;
      });
  }

}