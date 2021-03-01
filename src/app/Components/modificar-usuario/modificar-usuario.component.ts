import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styles: []
})
export class ModificarUsuarioComponent implements OnInit {

  usuario:any = {};
  usuarioEnviar:any = {};
  forma!: FormGroup;

  localidades: any = { 
    facet_groups:[
    "", {
    facets:[]
    }
  ]
};

  constructor(
    private formBuilder:FormBuilder,
    private _usuariosService: UsuarioService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.formulario_modificar();
  }

  ngOnInit(): void {
    this.mostrarLocalidad();
    this.datosUsuario();
  }

  formulario_modificar(){
    this.forma = this.formBuilder.group({
      correo:['', Validators.email],
      //pass:['', Validators.minLength(5)],
      //pass2:[''],
      nombre:['', Validators.minLength(3)],
      apellidos:['', Validators.minLength(5)],
      nombre_usuario: ['', Validators.minLength(5)],
      vivienda: this.formBuilder.group({
        direccion:[''],
        ciudad:[''],
        localidad:[''],
        cod_postal: ['', Validators.pattern("((0[1-9]|5[0-2])|[1-4][0-9])[0-9]{3}")],
        direccion2:[''],
        ciudad2:[''],
        localidad2:[''],
        cod_postal2: ['', Validators.pattern("((0[1-9]|5[0-2])|[1-4][0-9])[0-9]{3}")]
      }),
      telefono: ['', Validators.pattern("[0-9]{9}")],
      tarjeta: ['', Validators.pattern(/^(?:4\d([\- ])?\d{6}\1\d{5}|(?:4\d{3}|5[1-5]\d{2}|6011)([\- ])?\d{4}\2\d{4}\2\d{4})$/)], //Visa, master y discover                                        
    },{
      //validators:this._usuariosService.passwordsIguales('pass', 'pass2')
    })
  }

  rellenarUsuarios(){
    this.usuarioEnviar.nombre_usuario = this.forma.value.nombre_usuario;
    this.usuarioEnviar.nombre = this.forma.value.nombre;
    this.usuarioEnviar.apellidos = this.forma.value.apellidos;
    this.usuarioEnviar.correo = this.forma.value.correo;
    this.usuarioEnviar.pass = this.forma.value.pass;
    this.usuarioEnviar.cod_postal = this.forma.value.vivienda.cod_postal;
    this.usuarioEnviar.domicilio = this.forma.value.vivienda.direccion;
    this.usuarioEnviar.localidad = this.forma.value.vivienda.ciudad;
    this.usuarioEnviar.provincia = this.forma.value.vivienda.localidad;
    this.usuarioEnviar.cod_postal_2 = this.forma.value.vivienda.cod_postal2;
    this.usuarioEnviar.domicilio_2 = this.forma.value.vivienda.direccion2;
    this.usuarioEnviar.localidad_2 = this.forma.value.vivienda.ciudad2;
    this.usuarioEnviar.provincia_2 = this.forma.value.vivienda.localidad2;
    this.usuarioEnviar.tarjeta_credito = this.forma.value.tarjeta_credito;
    this.usuarioEnviar.telefono = this.forma.value.telefono;
  }
  
  mostrarLocalidad(){ //Usar localidades de una API
    this._usuariosService.getLocalidad()
    .subscribe( (localidades:any) => {
      localidades.facet_groups[1].facets.unshift({
        name:'Seleccione localidad'
      })
      this.localidades = localidades;
    })
  }

  datosUsuario(){
    this._usuariosService.getUsuario(this.activatedRoute.snapshot.params.id)
      .subscribe(respuesta => {
        this.usuario = respuesta;
        this.formulario_reset();
      },
      (err) => {
        err="ERROR";
        console.log(err);
      })
  }

  modificarUsuario(){
    this._usuariosService.modificarUsuario(this.usuarioEnviar, this.activatedRoute.snapshot.params.id)
    .subscribe(respuesta =>{
    },
      (err) => {
        err="ERROR";
        console.log(err);
      } 
    )
  }

  modificar(){
    this.recursivaModificar(this.forma);
    if(this.forma.valid){
      this.rellenarUsuarios();
      this.modificarUsuario();
      location.reload();
    } 
  }

  recursivaModificar(item: FormGroup): any{
    Object.values(item.controls).forEach(control =>{
      if(control instanceof FormGroup) this.recursivaModificar(control);
      control.markAsTouched()});
    return;
  }

  valido(texto:string){
    let elemento:any = this.forma.get(texto);
    if(elemento==null){
      elemento = {
        valid:false,
        untouched:false
      }
    }
    return !(elemento.invalid && elemento.touched);
  }

  /*get pass2Valido() {
    const pass1:any = this.forma.get('pass')!.value;
    const pass2:any = this.forma.get('pass2')!.value;
    return (pass1 === pass2) ? true : false;
  }*/

  formulario_reset(){
    this.forma.reset({
      correo:this.usuario.correo,
      pass:this.usuario.pass,
      //pass2:this.usuario.pass2,
      nombre:this.usuario.nombre,
      apellidos:this.usuario.apellidos,
      nombre_usuario: this.usuario.nombre_usuario,
      vivienda:{
        direccion:this.usuario.domicilio,
        ciudad:this.usuario.localidad,
        localidad:this.usuario.provincia,
        cod_postal: this.usuario.cod_postal,
        direccion2:this.usuario.domicilio_2,
        ciudad2:this.usuario.localidad_2,
        localidad2:this.usuario.provincia_2,
        cod_postal2: this.usuario.cod_postal_2
      },
      telefono: this.usuario.telefono, 
      tarjeta: this.usuario.tarjeta_credito
    })
  }

}
