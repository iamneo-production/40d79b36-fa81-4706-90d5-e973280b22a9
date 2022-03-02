import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-addloan',
  templateUrl: './addloan.component.html',
  styleUrls: ['./addloan.component.css']
})
export class AddloanComponent  {

  user:any={};
  constructor(private service: SharedService, private router: Router){}

  onClickSubmit(value: any){
    var loanapp = {
      loanType:"business",
      loanAmountRequired:value.amount,
      applicantName:value.name,
      applicantAddress:value.add,
      applicantMobile:value.mob,
      applicantEmail:value.email,
      applicantAadhaar:value.aadh,
      applicantPan:value.panno,
      applicantSalary:value.sal,
      LoanRepaymentMonths:value.number
 
    };
    var document= {
      documentType:value.selector,
      documentUpload:"document"

    };
    var myData :any = {};
    myData.loanAppData=loanapp;
    myData.documentData=document;

    $.ajax({
      type: 'POST',
      async: true,
      dataType: "json",
      url: "http://localhost:65487/AddLoan",
      data: myData,
      success: function (data) {
          console.log("Response Data ↓");
          console.log(data);
      },
      error: function (err) {
          console.log(err);
      }
  });

    // this.service.addUser(val).subscribe(res=>{
    //   alert(res.toString());
    //   this.router.navigate(['/login-page']);
    // })
  }
}

