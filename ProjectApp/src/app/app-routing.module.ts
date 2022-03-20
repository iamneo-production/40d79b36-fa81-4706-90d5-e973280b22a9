import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddloanComponent } from './applyloan/addloan/addloan.component';
import { ApplyloanComponent } from './applyloan/applyloan.component';
import { LoanstatusComponent } from './loanstatus/loanstatus.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AccountComponent } from './account/account.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  {path:'',redirectTo:'login-page',pathMatch:'full'},
  {path:'login-page',component:LoginPageComponent},
  {path:'Sign-up',component:SignUpComponent},
  {path:'applyloan',component:ApplyloanComponent},
  {path:'profile',component:ProfileComponent},
  {path:'loanstatus',component:LoanstatusComponent},
  {path:'addloan',component:AddloanComponent},
  {path:'account',component:AccountComponent},
  {path:'review',Component.ReviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
