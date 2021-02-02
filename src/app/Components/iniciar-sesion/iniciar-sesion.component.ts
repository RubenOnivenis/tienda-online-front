import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styles: [
  ]
})
export class IniciarSesionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public iniciar(forma:NgForm){
    console.log(forma);
    if(forma.invalid){
      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();
      })
      return;
    }
  }

}
