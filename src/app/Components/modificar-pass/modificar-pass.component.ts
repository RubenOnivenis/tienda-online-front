import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modificar-pass',
  templateUrl: './modificar-pass.component.html',
  styles: []
})
export class ModificarPassComponent implements OnInit {

  usuarioActual:any = {};
  usuario:any = {};
  forma_pass!: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private _usuariosService: UsuarioService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formularioPass();
    this.datosUsuario();
  }

  datosUsuario(){
    this._usuariosService.getUsuario(this.activatedRoute.snapshot.params.id)
      .subscribe(respuesta => {
        this.usuarioActual = respuesta;
      },
      (err) => {
        err="ERROR";
        console.log(err);
      })
  }

  formularioPass(){
    this.forma_pass = this.formBuilder.group({
     // pass_antigua:['', Validators.required],
      pass_nueva:['', [Validators.minLength(5), Validators.required]],
      pass_nueva_2:[''],
    }),{
      validators:this._usuariosService.passwordsIguales('pass_nueva', 'pass_nueva_2')
    }
  }

  rellenarPass(){
    this.usuario.pass = this.forma_pass.value.pass_nueva;
  }

  cambioPass(){
    this._usuariosService.modificarUsuarioPass(this.usuario, this.activatedRoute.snapshot.params.id)
      .subscribe(respuesta =>{
      },
        (err) => {
          err="ERROR";
          console.log(err);
        } 
      )
  }

  modificarPass(){
    this.recursivaModificar(this.forma_pass);
    if(this.forma_pass.valid){
      this.rellenarPass();
      this.cambioPass();
      location.reload();
    } 
  }

  recursivaModificar(item: FormGroup): any{
    Object.values(item.controls).forEach(control =>{
      if(control instanceof FormGroup) this.recursivaModificar(control);
      control.markAsTouched()});
    return;
  }

  valido(texto:string){
    let elemento:any = this.forma_pass.get(texto);
    if(elemento==null){
      elemento = {
        valid:false,
        untouched:false
      }
    }
    return !(elemento.invalid && elemento.touched);
  }

  get pass2Valido() {
    const pass_nueva:any = this.forma_pass.get('pass_nueva')!.value;
    const pass_nueva_2:any = this.forma_pass.get('pass_nueva_2')!.value;
    return (pass_nueva === pass_nueva_2) ? true : false;
  }

  formulario_reset(){
    this.forma_pass.reset({
      pass_nueva: this.usuario.pass
    })
  }

}
