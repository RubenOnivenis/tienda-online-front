import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http:HttpClient
  ) { }

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
