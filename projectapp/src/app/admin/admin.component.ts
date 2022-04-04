import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],


})
export class AdminComponent implements OnInit {

  constructor(private router: Router) { }
  

  ngOnInit(): void {
    if(sessionStorage.getItem("User")!="admin"){
      this.router.navigate(['/']);
    }
   
  }
 
  logout(){
    sessionStorage.removeItem("User");
    this.router.navigate(['/login-page']);
  }

}