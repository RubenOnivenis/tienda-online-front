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

  usuario = {
    localidad: ""
  }

  localidades: any [] = [];

  constructor(
    private formBuilder:FormBuilder,
    private _mermeladasListaService: MermeladasListaService
  ) { 
    this.formularioCrear();
  }

  ngOnInit(): void {
    this._mermeladasListaService.getLocalidad()
    .subscribe( (localidades:any) => {
      console.log(localidades);
      this.localidades = localidades;
      this.localidades.unshift({
        texto:'[Seleccione localidad]',
      })
    })
  }

  formularioCrear(){
    this.forma = this.formBuilder.group({
      email:['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      pass1:['', Validators.required],
      pass2:['', Validators.required],
      nombre:['', [Validators.required, Validators.minLength(2)]],
      apellido:['', [Validators.required, Validators.minLength(5)]],
      usuario: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern("[0-9]{9}")]],
      ciudad: ['', Validators.required],
      localidad: ['', Validators.required],
      cod_postal: ['', [Validators.required, Validators.pattern("((0[1-9]|5[0-2])|[1-4][0-9])[0-9]{3}")]],
      tarjeta: ['', Validators.pattern("/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9][0-9])[0-9]{12})$/")],
      condiciones: ['', Validators.required]
    })
  }

  public guardar(){
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
}
