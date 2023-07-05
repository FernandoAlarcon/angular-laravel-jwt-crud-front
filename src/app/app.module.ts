import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';

// COMPONENTES
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

// RUTAS
import { AppRoutingModule } from './app-routing.module';
// STYLES 
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// JQUERY
import * as $ from 'jquery';

// LIBRERIAS
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth.interceptor';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component'; 
import { ActividadComponent } from './components/actividades/actividades.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent,
    NavigationComponent,
    HomeComponent, 
    ActividadComponent
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    {  
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor,
      multi: true
    },
    {  
      provide: APP_BASE_HREF, 
      useValue : '/' , 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
