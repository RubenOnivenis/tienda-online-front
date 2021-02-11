import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

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
    private _usuariosService: UsuarioService
  ) { 
    this.formulario_modificar();
  }

  ngOnInit(): void {
    this._usuariosService.getLocalidad()
    .subscribe( (localidades:any) => {
      localidades.facet_groups[1].facets.unshift({
        name:'Seleccione localidad'
      })
      this.localidades = localidades;
    })
  }

  formulario_modificar(){
    this.forma = this.formBuilder.group({
      email:['', Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")],
      pass1:['', Validators.minLength(5)],
      pass2:[''],
      nombre:['', Validators.minLength(3)],
      apellido:['', Validators.minLength(5)],
      usuario: ['', Validators.minLength(5)],
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
      validators:this._usuariosService.passwordsIguales('pass1', 'pass2')
    })
  }

  modificar(){
    if (this.forma.invalid) this.recursivaModificar(this.forma);
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

  /*datosPorDefecto(){
    this.forma.setValue({
      email: "Rubenom11@gmail.com",
      usuario: "Rubenom11",
      nombre: "Rubén",
      apellido: "Onivenis Muñoz",
      direccion: "Calle inventada, Nº XX",
      ciudad: "Novelda del Guadiana",
      cod_postal: "06183",
      direccion2: "Calle inventada, Nº XX",
      ciudad2: "Badajoz",
      cod_postal2: "06000",
      telefono: "660108592",
      tarejta: "************7899",
    })
  }*/

  get pass2Valido() {
    const pass1:any = this.forma.get('pass1')!.value;
    const pass2:any = this.forma.get('pass2')!.value;
    return (pass1 === pass2) ? true : false;
  }

}
