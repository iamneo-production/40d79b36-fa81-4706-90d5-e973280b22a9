import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-addloan',
  templateUrl: './addloan.component.html',
  styleUrls: ['./addloan.component.css']
})
export class AddloanComponent  {

  user: any = {};
  email!: any;
  fileToUpload!: File;
  constructor(private service: SharedService, private router: Router){}

  ngOnInit(): void
  {
    this.service.getUser(sessionStorage.getItem("UserId")).subscribe(res=>{
      this.email = res.email;
      console.log(res);
      console.log(res.email);
    });
  }
  onSelectFile(event: any) {  
    this.fileToUpload = event.target.files.item(0);
  }  

  onClickSubmit(value: any){
    let formData = new FormData();
    var loanapp = {
      loanType:"business",
      loanAmountRequired:value.amount,
      applicantName:value.name,
      applicantAddress:value.add,
      applicantMobile:value.mob,
      applicantEmail: this.email,
      applicantAadhaar:value.aadh,
      applicantPan:value.panno,
      applicantSalary:value.sal,
      documentId: 0
    };
    console.log(loanapp);
    formData.append("type", value.selector);
    formData.append("file", this.fileToUpload);

    this.service.addDocument(formData).subscribe((res: any)=>{
      loanapp.documentId = parseInt(res);
      this.service.addLoan(loanapp).subscribe(res=>{
        alert(res.toString());
      })
    })
  }
}

