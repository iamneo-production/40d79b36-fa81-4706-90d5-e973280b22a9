import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  message: string = "";
  messageSet: boolean = false;
  messageOkSet: boolean = false;
  filler : any = {};
  user !: any;
  type !: any;
  
  usernametype = "hidden";
  emailtype = "hidden";
  mobiletype = "hidden";
  passwordtype = "hidden";
  constructor(private service: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.refreshProfile();
    this.filler.username = "";
    this.filler.phno = "";
    this.filler.email = "";
    this.filler.password = "";
    this.filler.password1 = "";
  }

  refreshProfile(){
    this.service.getUser(sessionStorage.getItem("UserId")).subscribe(data=>{
      this.user = data;
    });

    
  }

  delete(){
    this.service.deleteUser(sessionStorage.getItem("UserId")).subscribe(res=>{});
    sessionStorage.removeItem("UserId");
    this.router.navigate(['/login-page']);
  }

  onClickSubmit(value : any){
    this.messageSet = false;
    this.message = "";
    this.messageOkSet = false;
    
    if(value.username){
      let pattern = /^.{3,}$/;
      if(!pattern.test(value.username)){
        this.messageSet = true;
        this.message += "Enter valid username\n";
      }
    }else{
      value.username = this.user.username;
    }

    if(value.email){
      let pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
      if(!pattern.test(value.email)){
        this.messageSet = true;
        this.message += "Enter valid email\n";
      }
    }else{
      value.email = this.user.email;
    }

    if(value.phno){
      let pattern = /[0-9]{10}/;
      if(!pattern.test(value.phno)){
        this.messageSet = true;
        this.message += "Enter valid mobile Number\n";
      }
    }else
    {
      value.phno = this.user.mobileNumber;
    }

    if(value.password){
      let pattern = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?@]).*$/;
      if(!pattern.test(value.password)){
        this.messageSet = true;
        this.message += "Enter valid password\n";
      }else{
        if(value.password != value.password1){
          this.messageSet = true;
          this.message += "Passwords didn't match\n";
        }
      }
    }
    var val = {
      UserId : sessionStorage.getItem("UserId"),
      email : value.email,
      password : value.password,
      username : value.username,
      mobileNumber : value.phno,
      userRole : this.user.userRole
    }
    if(!this.messageSet){
      this.service.editUser(sessionStorage.getItem("UserId"), val).subscribe(res=>{
        this.refreshProfile();
        this.router.navigate([this.router.url]);
        this.messageOkSet = true;
      })
    }
  }

  toggleUsername(){
    if(this.usernametype=="hidden"){
      this.usernametype = "text";
    }else{
      this.usernametype = "hidden";
      this.filler.username = "";
    }
  }

  toggleEmail(){
    if(this.emailtype=="hidden"){
      this.emailtype = "email";
    }else{
      this.emailtype = "hidden";
      this.filler.email = "";
    }
  }

  togglePhno(){
    if(this.mobiletype=="hidden"){
      this.mobiletype = "text";
    }else{
      this.mobiletype = "hidden";
      this.filler.phno = "";
    }
  }

  togglePswd(){
    if(this.passwordtype=="hidden"){
      this.passwordtype = "password";
    }else{
      this.passwordtype = "hidden";
      this.filler.password = "";
      this.filler.password1 = "";
    }
  }

}
