import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  @Output() close: EventEmitter<any> = new EventEmitter();

  aceptarCookies(){
    this.visible = !this.visible;
    if(this.visible){
      this.close.emit(null);
    }
  }
}
