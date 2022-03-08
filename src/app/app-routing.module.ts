import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { UpdateComponent } from './update/update.component';
import { ViewComponent } from './view/view.component';
import { AuthGuardService } from './auth-guard.service';
import { HistoryComponent } from './history/history.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { AuthGuardUserService } from './auth-guard-user.service';
import { SearchComponent } from './search/search.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';
import { SearchViewComponent } from './search-view/search-view.component';
import { AddTimeComponent } from './add-time/add-time.component';
import { MainComponent } from './main/main.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthenticationGuard } from './authentication.guard';

const routes: Routes = [
  {path: 'vehicles', component: HomeComponent, canActivate:[AuthenticationGuard]},
  {path: 'login', component: LoginComponent},
  {path : 'logout', component: LogoutComponent, canActivate:[AuthenticationGuard]}, 
  {path: 'add', component: CreateComponent, canActivate:[AuthenticationGuard]},
  {path: 'login-user', component: LoginUserComponent},
  {path: 'add-time/:id', component: AddTimeComponent, canActivate:[AuthenticationGuard]},
  {path: 'history', component:HistoryComponent, canActivate:[AuthenticationGuard]},
  {path: 'search/:user', component: SearchComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'user-logout', component: UserLogoutComponent},
  {path: 'search-view/:id', component: SearchViewComponent},
  {path: 'home', component: MainComponent},
  {path: 'invoice/:id', component: InvoiceComponent, canActivate:[AuthenticationGuard]},
  {path: 'update/:id', component: UpdateComponent, canActivate:[AuthenticationGuard]},
  {path: 'view/:id', component: ViewComponent, canActivate:[AuthenticationGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
