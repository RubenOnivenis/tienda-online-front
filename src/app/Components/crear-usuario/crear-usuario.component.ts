import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { usuariosDatos, UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styles: [
]
})
export class CrearUsuarioComponent implements OnInit {

  diaActual:Date = new Date;
  usuario!: usuariosDatos;
  forma!:FormGroup;
  condicionesAceptadas:boolean = false;

  localidades: any = {  //Hay que decirle que existe facet_groups y facets porque sino lo busca al principio del programa y no lo encuentra
                        //porque solo existe cuando lo devuelve el get
    facet_groups:[
      "", {
        facets:[]
      }
    ]
  };

  constructor(
    private formBuilder:FormBuilder,
    private _usuariosService: UsuarioService,
    private router:Router
  ) { 
    this.formularioCrear();
  }

  ngOnInit(): void {
    this.mostrarLocalidades();
  }

  mostrarLocalidades(){
    this._usuariosService.getLocalidad()
      .subscribe( (localidades:any) => {
        localidades.facet_groups[1].facets.unshift({
          name:'[Seleccione localidad]'
        })
        this.localidades = localidades;
      })
  }

  formularioCrear(){
    this.forma = this.formBuilder.group({
      correo:['', [Validators.required, Validators.email]],
      pass:['', [Validators.required, Validators.minLength(5)]],
      pass2:['', Validators.required],
      nombre:['', [Validators.required, Validators.minLength(3)]],
      apellidos:['', [Validators.required, Validators.minLength(5)]],
      nombre_usuario: ['', [Validators.required, Validators.minLength(5)]],
      vivienda: this.formBuilder.group({
        domicilio: ['', Validators.required],
        localidad: ['', Validators.required],
        provincia: ['0', [Validators.required, Validators.min(1)]],
        cod_postal: ['', [Validators.required, Validators.pattern("((0[1-9]|5[0-2])|[1-4][0-9])[0-9]{3}")]],
        domicilio_2:[''],
        localidad_2:[''],
        provincia_2:['0'],
        cod_postal_2: ['', Validators.pattern("((0[1-9]|5[0-2])|[1-4][0-9])[0-9]{3}")]
      }),
      telefono: ['', Validators.pattern("[0-9]{9}")],
      tarjeta_credito: ['', Validators.pattern(/^(?:4\d([\- ])?\d{6}\1\d{5}|(?:4\d{3}|5[1-5]\d{2}|6011)([\- ])?\d{4}\2\d{4}\2\d{4})$/)], //Visa, master y discover                                        
      cvv: ["", Validators.pattern(/^[0-9]{3}$/)],
      caducidad: ["", [Validators.pattern(/^\d{2}\/\d{2}$/)]]
    },{
      validators:this._usuariosService.passwordsIguales('pass', 'pass2')
    })
  }

  usuarioNuevo(){
    this._usuariosService.crearUsuario(this.usuario)
      .subscribe(respuesta => {});
  }

  rellenar() {
    this.usuario={
      nombre_usuario:this.forma.value.nombre_usuario,
      nombre:this.forma.value.nombre,
      apellidos:this.forma.value.apellidos,
      correo:this.forma.value.correo,
      pass:this.forma.value.pass,
      cod_postal:this.forma.value.vivienda.cod_postal,
      domicilio:this.forma.value.vivienda.domicilio,
      localidad:this.forma.value.vivienda.localidad,
      provincia:this.forma.value.vivienda.provincia,
      cod_postal_2:this.forma.value.vivienda.cod_postal_2,
      domicilio_2:this.forma.value.vivienda.domicilio_2,
      localidad_2:this.forma.value.vivienda.localidad_2,
      provincia_2:this.forma.value.vivienda.provincia_2,
      tarjeta_credito:this.forma.value.tarjeta_credito,
      telefono:this.forma.value.telefono
    }
  }

  registrarse(){
    if (this.forma.invalid)
      this.recursivaRegistrarse(this.forma);
    else{
      this.rellenar();
      this.usuarioNuevo();
      this.rutaIniciarSesion();
    }
  }

  recursivaRegistrarse(item: FormGroup): any{
    Object.values(item.controls).forEach(control =>{
      if(control instanceof FormGroup) this.recursivaRegistrarse(control);
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

  aceptarCondiciones(){
    if((<HTMLInputElement>document.getElementsByName("aceptar")[0]).checked)
      this.condicionesAceptadas = true;
    else  
      this.condicionesAceptadas = false;
  }

  rutaIniciarSesion(){
    this.router.navigate(['/iniciarSesion']);
  }

}
