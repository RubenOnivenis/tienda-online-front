import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
//import { AgmCoreModule } from '@agm/core';

import { NavbarComponent } from './Components/shared/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTING } from './app.routes';
import { SectionComponent } from './Components/shared/section/section.component';
import { FooterComponent } from './Components/shared/footer/footer.component';
import { MermeladasComponent } from './Components/mermeladas/mermeladas.component';
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
import { CookiesComponent } from './Components/shared/cookies/cookies.component';
import { CookieService } from 'ngx-cookie-service';
import { DetallesProductoComponent } from './Components/detalles-producto/detalles-producto.component';
import { DevolucionComponent } from './Components/devolucion/devolucion.component';
import { productosService } from './services/productos.service';

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
    CookiesComponent,
    DetallesProductoComponent,
    DevolucionComponent
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
    productosService, 
    UsuarioService,
    {
      provide: LOCALE_ID,
      useValue:'es'
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
