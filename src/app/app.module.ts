import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './service/login/auth.service';
import { AcercadeComponent } from './components/acercade/acercade.component';
import { EditAcercadeComponent } from './components/acercade/edit-acercade.component';
import { ExperLabComponent } from './components/exper-lab/exper-lab.component';
import { EditExperLabComponent } from './components/exper-lab/edit-exper-lab.component';
import { NewExperLabComponent } from './components/exper-lab/new-exper-lab.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { EditEducacionComponent } from './components/educacion/edit-educacion.component';
import { NewEducacionComponent } from './components/educacion/new-educacion.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AcercadeComponent,
    EditAcercadeComponent,
    ExperLabComponent,
    EditExperLabComponent,
    NewExperLabComponent,
    EducacionComponent,
    NewEducacionComponent,
    EditEducacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [authInterceptorProviders, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
