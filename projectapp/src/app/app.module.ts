import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component' ;
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ApplyloanComponent } from './applyloan/applyloan.component';
import { ProfileComponent } from './applyloan/profile/profile.component';
import { AddloanComponent } from './applyloan/addloan/addloan.component';
import { LoanstatusComponent } from './applyloan/loanstatus/loanstatus.component';
import { ValidateEqualDirective, ValidateEqualModule } from 'ng-validate-equal';

import { SharedService } from './shared.service';
import { HttpClientModule} from '@angular/common/http';
import { AccountComponent } from './applyloan/account/account.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { AppliedLoansComponent } from './admin/applied-loans/applied-loans.component';
import { LoanDetailsComponent } from './admin/loan-details/loan-details.component';
import { HomeComponent } from './home/home.component';
import { ReviewComponent } from './applyloan/review/review.component';
import { RepaymentComponent } from './applyloan/Repayment/Repayment.component';
import { UserReviewsComponent } from './admin/user-reviews/user-reviews.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignUpComponent,
    ApplyloanComponent,
    ProfileComponent,
    AddloanComponent,
    LoanstatusComponent,
    AccountComponent,
    FooterComponent,
    AdminComponent,
    AppliedLoansComponent,
    LoanDetailsComponent,
    ReviewComponent,
    HomeComponent,
    RepaymentComponent,
    UserReviewsComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ValidateEqualModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
