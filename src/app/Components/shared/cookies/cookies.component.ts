import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styles: []
})
export class CookiesComponent implements OnInit {

  visible: boolean = true;
  cookieExist!:boolean;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(
    private _cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.cookieExist = this._cookieService.check('CookieRuben');
  }

  gestionarCookie(){
    this._cookieService.set('CookieRuben', 'Valor de la cookie');
    this._cookieService.get('CookieRuben');
  }

  aceptarCookies(){
    this.gestionarCookie();
    this.visible = !this.visible;
    if(this.visible){
      this.close.emit(null);
    }
  }
}
