import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/shared/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTING } from './app.routes';
import { SectionComponent } from './Components/section/section.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ElaboracionComponent } from './Components/elaboracion/elaboracion.component';
import { MermeladasComponent } from './Components/mermeladas/mermeladas.component';
import { MermeladasListaService } from './services/mermeladas-lista/mermeladas_lista.service';
import { registerLocaleData } from '@angular/common';
import localEs from '@angular/common/locales/es';
import { MermeladaComponent } from './Components/mermelada/mermelada.component';
registerLocaleData(localEs);


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SectionComponent,
    FooterComponent,
    ElaboracionComponent,
    MermeladasComponent,
    MermeladaComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    APP_ROUTING
  ],
  providers: [MermeladasListaService, 
    {
      provide: LOCALE_ID,
      useValue:'es'
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
