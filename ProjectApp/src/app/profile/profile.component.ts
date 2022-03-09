import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loans !: any;
  email!:any;
  user: any;
  constructor(private service: SharedService, private router: Router) { }
  
  ngOnInit(): void {
    this.getemail();
    this.refreshProfile();
  }

  getemail(){
    this.service.getUser(sessionStorage.getItem("UserId")).subscribe(data=>{
      this.user = data;
      this.email=this.user.email;
    
  });
  }
  

  refreshProfile(){
    
    this.service.getUser(sessionStorage.getItem("UserId")).subscribe(data=>{
      this.user = data;
      this.email=this.user.email;
      console.log(this.email)
      this.service.getLoan(this.email).subscribe(data=>{
      this.loans=data;
      console.log(this.loans)
    })
  });
  
    
  }
}
