import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './component/login/login.component';

export const routes: Routes = [
    {
    path: '', redirectTo: "login", pathMatch:'full',
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
    

];
