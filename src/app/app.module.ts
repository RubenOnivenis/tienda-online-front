import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/shared/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTING } from './app.routes';
import { SectionComponent } from './Components/section/section.component';
import { FooterComponent } from './Components/footer/footer.component';
import { MermeladasComponent } from './Components/mermeladas/mermeladas.component';
import { MermeladasListaService } from './services/mermeladas_lista.service';
import { registerLocaleData } from '@angular/common';
import localEs from '@angular/common/locales/es';
import { MermeladaComponent } from './Components/mermelada/mermelada.component';
import { BuscadorComponent } from './Components/buscador/buscador.component';
import { CrearUsuarioComponent } from './Components/crear-usuario/crear-usuario.component';
import { IniciarSesionComponent } from './Components/iniciar-sesion/iniciar-sesion.component';
import { PerfilComponent } from './Components/perfil/perfil.component';
import { MermeladaTarjetaComponent } from './Components/mermelada-tarjeta/mermelada-tarjeta.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from './services/usuario.service';
import { NoImagePipe } from './pipes/no-image.pipe';
import { CompraComponent } from './Components/compra/compra.component';
import { ModificarUsuarioComponent } from './Components/modificar-usuario/modificar-usuario.component';
import { CookiesComponent } from './Components/cookies/cookies.component';
import { CookieService } from 'ngx-cookie-service';
registerLocaleData(localEs);


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SectionComponent,
    FooterComponent,
    MermeladasComponent,
    MermeladaComponent,
    BuscadorComponent,
    CrearUsuarioComponent,
    IniciarSesionComponent,
    PerfilComponent,
    MermeladaTarjetaComponent,
    NoImagePipe,
    CompraComponent,
    ModificarUsuarioComponent,
    CookiesComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    RouterModule,
    APP_ROUTING
  ],
  providers: [
    CookieService,
    MermeladasListaService, 
    UsuarioService,
    {
      provide: LOCALE_ID,
      useValue:'es'
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
