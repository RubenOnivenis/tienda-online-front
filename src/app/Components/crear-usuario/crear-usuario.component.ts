import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MermeladasListaService } from 'src/app/services/mermeladas-lista/mermeladas_lista.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styles: [
  ]
})
export class CrearUsuarioComponent implements OnInit {

  forma!:FormGroup;

  /*usuario = {
    localidad: ""
  }*/

  //localidades: any [] = [];

  constructor(
    private formBuilder:FormBuilder,
    private _mermeladasListaService: MermeladasListaService
  ) { 
    this.formularioCrear();
  }

  ngOnInit(): void {
    /*this._mermeladasListaService.getLocalidad()
    .subscribe( (localidades:any) => {
      console.log(localidades);
      this.localidades = localidades;
      this.localidades.unshift({
        texto:'[Seleccione localidad]',
      })
    })*/
  }

  formularioCrear(){
    this.forma = this.formBuilder.group({
      email:['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      pass1:['', Validators.required],
      pass2:['', Validators.required],
      nombre:['', [Validators.required, Validators.minLength(3)]],
      apellido:['', [Validators.required, Validators.minLength(5)]],
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      direccion: ['', Validators.required],
      telefono: ['', Validators.pattern("[0-9]{9}")],
      ciudad: ['', Validators.required],
      //localidad: ['', Validators.required],
      cod_postal: ['', [Validators.required, Validators.pattern("((0[1-9]|5[0-2])|[1-4][0-9])[0-9]{3}")]],
      tarjeta: ['', Validators.pattern("5[1-5][0-9]{14}$")],  //MASTERCARD
                                                            //Visa, master y discover: 
                                                            //^(?:4\d([\- ])?\d{6}\1\d{5}|(?:4\d{3}|5[1-5]\d{2}|6011)([\- ])?\d{4}\2\d{4}\2\d{4})$
      condiciones: ['', Validators.required]
    },{
      validators:this._mermeladasListaService.passwordsIguales('pass1', 'pass2')
    })
  }

  public registrarse(){
    console.log(this.forma);
    if(this.forma.invalid){
      Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup)
          Object.values(control.controls).forEach(control => control.markAsTouched());
        else
          control.markAsTouched();
      })
      return;
    }
    this.forma.reset({});
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
    const pass1:any = this.forma.get('pass1')!.value;
    const pass2:any = this.forma.get('pass2')!.value;
    return (pass1 === pass2) ? true : false;
  }
}
