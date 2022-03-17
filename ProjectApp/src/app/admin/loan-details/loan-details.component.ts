import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.css']
})
export class LoanDetailsComponent implements OnInit {

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
    this.service.getLoan(id).subscribe(res => {
      this.loan = res;
      if(res==null){
        this.messageSet = true;
        this.loanSet = false;
      }else{
        this.loanSet = true;
        this.messageSet = false;
      }
      console.log(this.loan.TimestampofLoan);
    })
  }

}
