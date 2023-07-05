import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { SigninComponent }   from './components/signin/signin.component'; 
import { SignupComponent }   from './components/signup/signup.component';
import { HomeComponent }     from './components/home/home.component'; 
import { ActividadComponent } from './components/actividades/actividades.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';


import { from } from 'rxjs';

const routes: Routes = [
  { path: '',redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',       component: HomeComponent },
  { path: 'profile',    component: UserProfileComponent },
  { path: 'register',   component: SignupComponent }, 
  { path: 'login',      component: SigninComponent }, 
  { path: 'actividades', component: ActividadComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
