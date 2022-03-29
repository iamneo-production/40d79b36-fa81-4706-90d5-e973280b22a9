import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-loanstatus',
  templateUrl: './loanstatus.component.html',
  styleUrls: ['./loanstatus.component.css']
})
export class LoanstatusComponent implements OnInit {

  temp: any = {};
  loan!: any;
  loanId!: any;
  loanSet: boolean = false;
  messageSet: boolean = false;

  constructor(private service: SharedService, private router: Router) { }

  ngOnInit(): void {  }

  searchFun(val: any){
    this.getLoan(val.searchId);
  }

  downloadFile(id:any){
    this.service.getDocument(id).subscribe((data: any)=>{
      const blob = new Blob([data], { type: data.type });
      const url= window.URL.createObjectURL(blob);
      var anchor = document.createElement("a");
      anchor.download = "attachment";
      anchor.href = url;
      anchor.target = "_blank";
      anchor.click();
      anchor.remove();
    });
  }

  getLoan(id:any){
    this.loanId = id;
    let email;
    this.service.getLoan(id).subscribe(res => {
      this.loan = res;
      this.service.getUser(sessionStorage.getItem("UserId")).subscribe(data=>{
        email=data?.email;
        if(res==null || this.loan.applicantEmail!=email){
          this.messageSet = true;
          this.loanSet = false;
        }else{
          this.loanSet = true;
          this.messageSet = false;
        }
      });
    })
  }

  review(){
    this.router.navigate(['/applyloan/review']);
  }
}
