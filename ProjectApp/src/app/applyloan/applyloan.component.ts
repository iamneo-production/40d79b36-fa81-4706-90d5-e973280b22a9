import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applyloan',
  templateUrl: './applyloan.component.html',
  styleUrls: ['./applyloan.component.css']
})
export class ApplyloanComponent {
  
  constructor(private router: Router){}

  ngOnInit(): void {
    if(sessionStorage.getItem("UserId")==null){
      this.router.navigate(['/']);
    }
  }

  logout(){
    sessionStorage.removeItem("UserId");
    this.router.navigate(['/login-page'])
  }
}
