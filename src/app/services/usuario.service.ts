import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface usuariosDatos {
  id_usuario?:number,
  nombre_usuario:string,
  nombre:string,
  apellidos:string,
  correo:string,
  pass:string,
  cod_postal:string,
  domicilio:string,
  localidad:string,
  provincia:string,
  cod_postal_2:string,
  domicilio_2:string,
  localidad_2:string,
  provincia_2:string,
  tarjeta_credito:string,
  telefono:string
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  forma!:FormGroup;
  API_URI = 'http://localhost:8080/api';

  constructor(
    private http:HttpClient
  ) { }
  
  getUsuario(id_usuario:number){
    return this.http.get(`${this.API_URI}/usuario/${id_usuario}`);
  }

  crearUsuario(usuario: usuariosDatos){
    console.log(usuario);
    return this.http.post(`${this.API_URI}/usuarios`, usuario);
  }

  modificarUsuario(usuario: usuariosDatos, id:number){
    return this.http.put(`${this.API_URI}/usuarios/${id}`, usuario);
  }

  modificarUsuarioPass(usuario: usuariosDatos, id:number){
    return this.http.put(`${this.API_URI}/usuarios/pass/${id}`, usuario);
  }

  getLocalidad(){
    return this.http.get("https://public.opendatasoft.com/api/records/1.0/search/?dataset=provincias-espanolas&q=&sort=provincia&facet=ccaa&facet=provincia");
  } 

  passwordsIguales(pass1:string, pass2:string){
    return (formGroup:FormGroup) =>{
      const pass1control = formGroup.controls[pass1];
      const pass2control = formGroup.controls[pass2];
      if (pass1control.value === pass2control.value)
        pass2control.setErrors(null);
      else
        pass2control.setErrors({noEsIgual:true});
    }
  }

  /*existeUsuario(control:FormControl): Promise<errorValidate> | Observable<errorValidate>{
        return new Promise( (resolve:any, reject) => {
            setTimeout(() =>{
            if (control.value === "Rubén")
                resolve({ existe: true })
            else
                resolve(null);
            }, 2000);
        });
    }*/

}
