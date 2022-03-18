import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddloanComponent } from './applyloan/addloan/addloan.component';
import { ApplyloanComponent } from './applyloan/applyloan.component';
import { LoanstatusComponent } from './applyloan/loanstatus/loanstatus.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProfileComponent } from './applyloan/profile/profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AccountComponent } from './applyloan/account/account.component';
import { AdminComponent } from './admin/admin.component';
import { AppliedLoansComponent } from './admin/applied-loans/applied-loans.component';
import { LoanDetailsComponent } from './admin/loan-details/loan-details.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  {path:'',redirectTo:'login-page',pathMatch:'full'},
  {path:'login-page',component:LoginPageComponent},
  {path:'Sign-up',component:SignUpComponent},
  {path:'applyloan',component:ApplyloanComponent, children: [
    {path:'profile',component:ProfileComponent},
    {path:'loanstatus',component:LoanstatusComponent},
    {path:'addloan', component:AddloanComponent},
    {path:'account', component:AccountComponent},
    {path:'footer',component:FooterComponent},
  ]},
  {path:'admin', component: AdminComponent, children: [
    {path: 'appliedloans', component: AppliedLoansComponent},
    {path: 'loandetails', component: LoanDetailsComponent}
  ]},
  //{path:'**', redirectTo:'404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
