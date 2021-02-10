import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

  transform(
      urlImagen:string | undefined, 
      optionalImage:boolean = false
    ): string {
    if(!urlImagen || urlImagen=="" || urlImagen.substring(0, 11)!="assets/img/"){
      if(optionalImage){
        return "assets/img/perfil.jpg";
      }
      return "assets/img/noimage.png";
    }
    return urlImagen;
  }

}
