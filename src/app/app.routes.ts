import {Router, RouterModule, Routes} from '@angular/router';
import { HomeComponent } from 'src/app/Components/home/home.component';
import { ElaboracionComponent } from './Components/elaboracion/elaboracion.component';
import { MermeladaComponent } from './Components/mermelada/mermelada.component';
import { MermeladasComponent } from './Components/mermeladas/mermeladas.component';

const APP_ROUTES: Routes = 
[
    { path: 'home', component: HomeComponent },
    { path: 'elaboracion', component: ElaboracionComponent },
    { path: 'mermeladas', component: MermeladasComponent },
    { path: 'mermelada/:id', component:MermeladaComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});