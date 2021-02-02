import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MermeladasListaService } from 'src/app/services/mermeladas-lista/mermeladas_lista.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styles: [
  ]
})
export class CrearUsuarioComponent implements OnInit {

  localidades: any [] = [];

  constructor(
    private _mermeladasListaService: MermeladasListaService
  ) { }

  ngOnInit(): void {
    this._mermeladasListaService.getLocalidad()
    .subscribe( (paises:any) => {
      console.log(paises);
      this.localidades = paises;
      this.localidades.unshift({
        name:'[Seleccione localidad]',
        alpha3Code: ""
      })
    })
  }

  public guardar(forma:NgForm){
    console.log(forma);
    if(forma.invalid){
      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();
      })
      return;
    }
  }

}
