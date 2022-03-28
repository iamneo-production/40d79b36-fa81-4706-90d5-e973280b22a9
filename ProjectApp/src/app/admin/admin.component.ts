import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],


})
export class AdminComponent implements OnInit {

  constructor(private service: SharedService,private router: Router) { }
  ReviewList:any=[];

  ngOnInit(): void {
    if(sessionStorage.getItem("User")!="admin"){
      this.router.navigate(['/']);
    }
    this.refreshRevList();
  }
 refreshRevList(){
     this.service.getReview().subscribe(data=>{
       this.ReviewList=data;
    });
  }

  logout(){
    sessionStorage.removeItem("User");
    this.router.navigate(['/login-page']);
  }

}
