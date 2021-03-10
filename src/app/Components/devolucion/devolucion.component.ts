import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-devolucion',
  templateUrl: './devolucion.component.html',
  styles: [
  ]
})
export class DevolucionComponent implements OnInit {

  forma!:FormGroup;

  constructor(
    private formBuilder:FormBuilder
  ) { 
    this.formularioDevolucion();
  }

  ngOnInit(): void {
  }

  formularioDevolucion(){
    this.forma = this.formBuilder.group({
      //n_pedido:['', Validators.required],
     // direccion:['', Validators.required],
      motivo:['', Validators.required]
    })
  }

  enviar(){
    if(this.forma.invalid){
      Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup)
          Object.values(control.controls).forEach(control => control.markAsTouched());
        else
          control.markAsTouched();
      })
      return;
    }
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
