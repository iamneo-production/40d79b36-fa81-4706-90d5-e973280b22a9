import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: any = {};

  constructor(private service: SharedService, private router: Router){}

  ngOnInit(): void { }

  onClickSubmit(value: any){
    var val = {
      email : value.e_mail,
      password : value.password,
      username : value.username,
      mobileNumber : value.phoneno,
      userRole : value.selector
    }
    this.service.addUser(val).subscribe(res=>{
      alert(res.toString());
      this.router.navigate(['/login-page']);
    })
  }

}
