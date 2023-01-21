import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAcercadeComponent } from './components/acercade/edit-acercade.component';
import { EditExperLabComponent } from './components/exper-lab/edit-exper-lab.component';
import { NewExperLabComponent } from './components/exper-lab/new-exper-lab.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  // rutas al login y registro
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  //rutas al index
  {path: '', component: HomeComponent},  
  {path: 'home', component: HomeComponent},
  //rutas de creacion y edicion
  {path: 'editAcer/:id', component: EditAcercadeComponent},
  {path: 'newExperLab', component: NewExperLabComponent},
  {path: 'editExperLab/:id', component: EditExperLabComponent}, 

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
