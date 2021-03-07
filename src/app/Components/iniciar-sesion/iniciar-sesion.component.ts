import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styles: [
  ]
})
export class IniciarSesionComponent implements OnInit {

  forma!:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private router:Router
  ) {
    this.formularioInicio();
   }

  ngOnInit(): void {
  }

  formularioInicio(){
    this.forma = this.formBuilder.group({
      email:['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      pass:['', Validators.required]
    })
  }
  
  iniciar(){
    if(this.forma.invalid){
      Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup)
          Object.values(control.controls).forEach(control => control.markAsTouched());
        else
          control.markAsTouched();
      })
      return;
    }
    else{
      this.router.navigate(['/perfil/1']);
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
