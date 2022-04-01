import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applyloan',
  templateUrl: './applyloan.component.html',
  styleUrls: ['./applyloan.component.css']
})
export class ApplyloanComponent {
  
  home: boolean = true;
  constructor(private router: Router){}

  ngOnInit(): void {
    this.home = true;
    if(sessionStorage.getItem("UserId")==null){
      this.router.navigate(['/']);
    }
  }

  logout(){
    sessionStorage.removeItem("UserId");
    this.router.navigate(['/login-page'])
  }
}
