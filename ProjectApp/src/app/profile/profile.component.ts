import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { getLocaleEraNames } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loans !: any;
  email!:any;
  user: any;
id:any;
  message: string = "";
  messageSet: boolean = false;
  messageOkSet: boolean = false;
  filler : any = {};
  type !: any;
  loan!: any;
  addresstype="hidden"
  aadhaartype="hidden"
  pantype="hidden"
  salarytype="hidden"
  amounttype="hidden"

  constructor(private service: SharedService, private router: Router) { }
  
  ngOnInit(): void {
    this.getemail();
    this.refreshProfile();
    this.filler.address="";
    this.filler.aadhaar="";
    this.filler.panno="";
    this.filler.salary="";
    this.filler.amount="";
    
  }

  getemail(){
    this.service.getUser(sessionStorage.getItem("UserId")).subscribe(data=>{
      this.user = data;
      this.email=this.user.email;
    
  });
  }
  
   fetchloan(){
    this.service.getLoan(this.id).subscribe(data=>{
      this.loan=data;
      console.log(this.loan)
  });
  }
  
  refreshProfile(){
    
    this.service.getUser(sessionStorage.getItem("UserId")).subscribe(data=>{
      this.user = data;
      this.email=this.user.email;
      this.service.getLoans(this.email).subscribe(data=>{
        this.loans=data;
        console.log(this.loans)

    })
  });    
  }

func(id:any){
  this.id=id
  console.log(this.id);
}

onClickSubmit(value : any){
    this.messageSet = false;
    this.message = "";
    this.messageOkSet = false;
    this.service.getLoan(this.id).subscribe(data=>{
      this.loan=data;
    
      if(value.address){
        let pattern = /^.{3,}$/;
        if(!pattern.test(value.address)){
          this.messageSet = true;
          this.message += "Enter Valid Address\n";
        }
       }
       else{value.address=this.loan.applicantAddress;}
  
      if(value.aadhaar){
        let pattern=/[0-9]{12}/;
        if(!pattern.test(value.aadhaar)){
          this.messageSet = true;
          this.message += "Enter Valid AadhaarNumber\n";
        }
        else{
          value.aadhaar=this.loan.applicantAadhaar;
        }
      }
  
      if(value.panno){
        let pattern=/[A-Z]{5}[0-9]{4}[A-Z]{1}/;
        if(!pattern.test(value.panno)){
          this.messageSet = true;
          this.message += "Enter Valid PanNumber\n";
        }
        else{
          value.panno=this.loan.applicantPan;
        }
      }
  
      if(value.salary){
        let pattern=/^(?!0+(?:\.0+)?$)[0-9]+(?:\.[0-9]+)?$/;
        if(!pattern.test(value.aadhaar)){
          this.messageSet = true;
          this.message += "Enter Valid salary\n";
        }
        else{
          value.salary=this.loan.applicantSalary;
        }
      }
  
      if(value.amount){
        let pattern=/^(?!0+(?:\.0+)?$)[0-9]+(?:\.[0-9]+)?$/;
        if(!pattern.test(value.amount)){
          this.messageSet = true;
          this.message += "Enter Valid LoanAmount\n";
        }
        else{
          value.amount=this.loan.LoanAmountRequired;
        }
      }
     
    var val={
      //loanId:value.loanId,
  
      applicantAddress:value.address,
      applicantAadhaar:value.aadhaar,
      applicantPan:value.panno,
      applicantSalary:value.salary,
      LoanAmountRequired:value.amount,
      
  
    }
    
    if(!this.messageSet){
      this.service.editLoan(this.id, val).subscribe(res=>{
        this.refreshProfile();
        this.router.navigate([this.router.url]);
        this.messageOkSet = true;
      })
    }
      console.log(this.loan)
  });
    



  }    




  toggleAddress(){
    if(this.addresstype=="hidden"){
      this.addresstype = "text";
    }else{
      this.addresstype = "hidden";
      this.filler.address = "";
    }
  }
  toggleAadhaar(){
    if(this.aadhaartype=="hidden"){
      this.aadhaartype = "number";
    }else{
      this.aadhaartype = "hidden";
      this.filler.aadhaar = "";
    }
  }
  togglePan(){
    if(this.pantype=="hidden"){
      this.pantype = "text";
    }else{
      this.pantype = "hidden";
      this.filler.panno = "";
    }
  }
  toggleSalary(){
    if(this.salarytype=="hidden"){
      this.salarytype = "number";
    }else{
      this.salarytype = "hidden";
      this.filler.salary = "";
    }
  }
  toggleLoanAmount(){
    if(this.amounttype=="hidden"){
      this.amounttype = "number";
    }else{
      this.amounttype = "hidden";
      this.filler.amount = "";
    }
  }

  
}
