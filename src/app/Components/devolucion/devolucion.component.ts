import { ThrowStmt } from '@angular/compiler';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EncargosService } from 'src/app/services/encargos.service';

@Component({
  selector: 'app-devolucion',
  templateUrl: './devolucion.component.html',
  styles: []
})
export class DevolucionComponent implements OnInit {

  forma!:FormGroup;
  encargo: any = {};

  constructor(
    private formBuilder:FormBuilder,
    private _encargosService:EncargosService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) { 
    this.formularioDevolucion();
  }

  ngOnInit(): void {
  }

  formularioDevolucion(){
    this.forma = this.formBuilder.group({
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
    this.getEncargo();
    this.rutaPerfil();
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

  getEncargo(){
    this._encargosService.verEncargo(this.activatedRoute.snapshot.params.id)
      .subscribe(respuesta => {
        this.encargo = respuesta;
        this.rellenarEncargo();
        this.modificarEncargo();
      })
  }

  rellenarEncargo(){
    if(this.encargo[0].estado == 'P'){
      this.encargo[0].estado = 'C';
    }
    else{
      if(this.encargo[0].estado == 'E'){
        this.encargo[0].estado = 'D';
      }
    }
  }

  modificarEncargo(){
    let encargo = {
      estado: this.encargo[0].estado
    }
    this._encargosService.modificarEstado(encargo, this.activatedRoute.snapshot.params.id)
      .subscribe(respuesta => {})
  }

  rutaPerfil(){
    
    this.router.navigate(['/perfil', 1]);
  }

}
