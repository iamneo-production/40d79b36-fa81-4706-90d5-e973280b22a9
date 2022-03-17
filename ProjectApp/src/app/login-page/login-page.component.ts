import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  message: string = "";
  messageSet: boolean = false;
  user: any = {};
  constructor(private service: SharedService, private router: Router){}

  onClickSubmit(value: any){
    var val = {
      email : value.e_mail,
      password : value.password
    }
    this.service.isUserPresent(val).subscribe(res=>{
      if(!isNaN(Number(res))){
        this.service.isAdmin(val.email).subscribe(flag=>{
          if(flag){
            sessionStorage.setItem("User", "admin");
            this.router.navigate(['/admin']);
          }else{
            sessionStorage.setItem("UserId", res.toString());
            this.router.navigate(['/applyloan']);
          }
        });
      }else{
        this.messageSet = true;
        this.message = res.toString();
      }
    })
  }
}
