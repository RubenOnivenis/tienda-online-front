import { Component, OnInit, Output } from '@angular/core';
import * as EventEmitter from 'events';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styles: []
})
export class CookiesComponent implements OnInit {

  nombre:string = 'Ruben';

  constructor(
    private _cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this._cookieService.set('miCookie', 'Valor de la cookie');
    this._cookieService.get('miCookie')
  }

  visible: boolean = true;

  @Output() close:any = new EventEmitter();

  onGRDP(){
    this.visible = !this.visible;
    if(this.visible){
      this.close.emit(null);
    }
  }
}
