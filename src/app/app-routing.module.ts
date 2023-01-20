import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAcercadeComponent } from './components/acercade/edit-acercade.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  // rutas a login y registro
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  //rutas
  {path: '', component: HomeComponent},  
  {path: 'home', component: HomeComponent},
  {path: 'editAcer/:id', component: EditAcercadeComponent}, 

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
