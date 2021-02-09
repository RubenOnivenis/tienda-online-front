import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styles: [

  ]
})
export class CrearUsuarioComponent implements OnInit {

  forma!:FormGroup;
  condicionesAceptadas:boolean = false;

  localidades: any = {  //Hay que decirle que existe facet_groups y facets porque sino lo busca al principio del programa y no lo encuentra
                        //porque solo existe cuando lo devuelve el get
    facet_groups:[
      "", {
        facets:[]
      }
    ]
  };

  constructor(
    private formBuilder:FormBuilder,
    private _usuariosService: UsuarioService
  ) { 
    this.formularioCrear();
  }

  ngOnInit(): void {
    this._usuariosService.getLocalidad()
      .subscribe( (localidades:any) => {
        localidades.facet_groups[1].facets.unshift({
          name:'[Seleccione localidad]'
        })
        this.localidades = localidades;
      })
  }

  formularioCrear(){
    this.forma = this.formBuilder.group({
      email:['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      pass1:['', Validators.required],
      pass2:['', Validators.required],
      nombre:['', [Validators.required, Validators.minLength(3)]],
      apellido:['', [Validators.required, Validators.minLength(5)]],
      usuario: ['', [Validators.required, Validators.minLength(5)]],
      vivienda: this.formBuilder.group({
        direccion: ['', Validators.required],
        ciudad: ['', Validators.required],
        localidad: ['0', [Validators.required, Validators.min(1)]],
        cod_postal: ['', [Validators.required, Validators.pattern("((0[1-9]|5[0-2])|[1-4][0-9])[0-9]{3}")]],
        cod_postal2: ['', Validators.pattern("((0[1-9]|5[0-2])|[1-4][0-9])[0-9]{3}")]
      }),
      telefono: ['', Validators.pattern("[0-9]{9}")],
      tarjeta: ['', Validators.pattern(/^(?:4\d([\- ])?\d{6}\1\d{5}|(?:4\d{3}|5[1-5]\d{2}|6011)([\- ])?\d{4}\2\d{4}\2\d{4})$/)], //Visa, master y discover                                        
    },{
      validators:this._usuariosService.passwordsIguales('pass1', 'pass2')
    })
  }

  registrarse(){
    if (this.forma.invalid)
      this.recursivaRegistrarse(this.forma);
  }

  recursivaRegistrarse(item: FormGroup): any{
    Object.values(item.controls).forEach(control =>{
      if(control instanceof FormGroup) this.recursivaRegistrarse(control);
      control.markAsTouched()});
    return;
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

  aceptarCondiciones(){
    if((<HTMLInputElement>document.getElementsByName("aceptar")[0]).checked)
      this.condicionesAceptadas = true;
    else  
      this.condicionesAceptadas = false;
  }
}
