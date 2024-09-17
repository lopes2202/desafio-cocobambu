import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ComponenteFavoritarComponent } from './component/componente-favoritar/componente-favoritar.component';

export const routes: Routes = [
    {
        path: '', 
        redirectTo: 'login', 
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'livrofavoritado',
        component: ComponenteFavoritarComponent 
      },
    ];