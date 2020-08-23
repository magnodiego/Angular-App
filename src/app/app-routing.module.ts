import { LoginGuardService } from './services/login-guard.service';
import { UserDataComponent } from './user-data/user-data.component';
import { RegisterComponent } from './register/register.component';
import { ComponentFixture } from '@angular/core/testing';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [LoginGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
