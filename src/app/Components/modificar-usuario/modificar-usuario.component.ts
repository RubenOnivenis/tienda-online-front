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

  modificarUsuario(){
    this._usuariosService.modificarUsuario(this.usuario, this.activatedRoute.snapshot.params.id)
    .subscribe(respuesta =>{
      respuesta="se realizo bien el cambio";
      console.log(respuesta);
      location.reload();
    },
      (err) => {
        err="ERROR";
        console.log(err);
      } 
    )
  }

  mostrarLocalidad(){
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
      },
      (err) => {
        err="ERROR";
        console.log(err);
      })
  }

  formulario_modificar(){
    this.forma = this.formBuilder.group({
      correo:['', Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")],
      pass:['', Validators.minLength(5)],
      pass2:[''],
      nombre:['', Validators.minLength(3)],
      apellido:['', Validators.minLength(5)],
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
      validators:this._usuariosService.passwordsIguales('pass', 'pass2')
    })
  }

  modificar(){
    if (this.forma.invalid){
      this.recursivaModificar(this.forma);
    }else{
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

  get pass2Valido() {
    const pass1:any = this.forma.get('pass')!.value;
    const pass2:any = this.forma.get('pass2')!.value;
    return (pass1 === pass2) ? true : false;
  }


}
