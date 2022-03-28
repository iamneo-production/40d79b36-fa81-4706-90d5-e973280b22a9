import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.css']
})
export class UserReviewsComponent implements OnInit {

  constructor(private service: SharedService,private router: Router) { }
  ReviewList:any=[];

  ngOnInit(): void {
    this.refreshRevList();
  }
  refreshRevList(){
    this.service.getReview().subscribe(data=>{
      this.ReviewList=data;
   });
 }

}
