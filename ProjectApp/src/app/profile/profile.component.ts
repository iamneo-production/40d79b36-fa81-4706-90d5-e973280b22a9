import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { getLocaleEraNames } from '@angular/common';
import { HttpEventType } from '@angular/common/http';

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
  docId!:any;
  addresstype="hidden";
  aadhaartype="hidden";
  pantype="hidden";
  salarytype="hidden";
  nametype="hidden";
  doctype="hidden";
  fileToUpload!:File;
  fileType!: any;
  displayProgress!: boolean;
  progress!: number;
  download!: boolean;
  fileSet: boolean = false;

  constructor(private service: SharedService, private router: Router) { }
  
  ngOnInit(): void {
    this.getemail();
    this.refreshProfile();
    this.filler.address="";
    this.filler.aadhaar="";
    this.filler.panno="";
    this.filler.salary="";
    this.filler.name="";
    this.filler.myfile="";
    this.filler.doctype="";
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
  });
  }
 

  refreshProfile(){
    
    this.service.getUser(sessionStorage.getItem("UserId")).subscribe(data=>{
      this.user = data;
      this.email=this.user.email;
      this.service.getLoans(this.email).subscribe(data=>{
        this.loans=data;
    })});
  }


func(id:any){
  this.id=id
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
        let pattern=/^[0-9]{12}$/;
        if(!pattern.test(value.aadhaar)){
          this.messageSet = true;
          this.message += "Enter Valid AadhaarNumber\n";
        }
      }
      else{
        value.aadhaar=this.loan.applicantAadhaar;
      }
  
      if(value.panno){
        let pattern=/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if(!pattern.test(value.panno)){
          this.messageSet = true;
          this.message += "Enter Valid PanNumber\n";
        }
      }
      else{
        value.panno=this.loan.applicantPan;
      }
  
      if(value.salary){
        let pattern=/^(?!0+(?:\.0+)?$)[0-9]+(?:\.[0-9]+)?$/;
        if(!pattern.test(value.salary)){
          this.messageSet = true;
          this.message += "Enter Valid salary\n";
        }
      }
      else{
        value.salary=this.loan.applicantSalary;
      }
  
      if(value.name){
        let pattern=/^.{3,}$/;
        if(!pattern.test(value.name)){
          this.messageSet = true;
          this.message += "Enter Valid Name\n";
        }
      }
      else{
        value.name=this.loan.applicantName;
      }
    
    var val={
      //loanId:value.loanId,
  
      applicantAddress:value.address,
      applicantAadhaar:value.aadhaar,
      applicantPan:value.panno,
      applicantSalary:value.salary,
      applicantName:value.name,
      applicantMobile:this.loan.applicantMobile,
      applicantEmail:this.loan.applicantEmail,
      loanAmountRequired:this.loan.loanAmountRequired,
      LoanRepaymentMonths:this.loan.LoanRepaymentMonths,
      documentId:this.loan.documentId
  
    }
    
    if(!this.messageSet){
      if(this.fileSet){
        let formData = new FormData();
        formData.append("file", this.fileToUpload);
        formData.append("type", this.fileType);
        this.service.addDocument(formData).subscribe( (res: any) =>{
          if(res.type == HttpEventType.UploadProgress){
            this.displayProgress = true;
            this.progress = Math.round((100 * res.loaded) / res.total);
          }else if (res.type == HttpEventType.Response){
            this.displayProgress = false;
            val.documentId = res.body;
            this.service.editLoan(this.id, val).subscribe(result=>{
              this.refreshProfile();
              this.router.navigate([this.router.url]);
              this.messageOkSet = true;
              this.messageSet = false;
              this.fileSet = false;
            })
          }
        })
      }else{
        this.service.editLoan(this.id, val).subscribe(res=>{
          this.refreshProfile();
          this.router.navigate([this.router.url]);
          this.messageOkSet = true;
          this.messageSet = false;
        })
      }
    }
  });
  }    

  onSelectFile(event: any) { 
    this.fileSet = true; 
    this.fileToUpload = event.target.files.item(0);
    this.fileType = event.target.files.item(0).type;
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
      this.aadhaartype = "text";
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
  toggleName(){
    if(this.nametype=="hidden"){
      this.nametype = "name";
    }else{
      this.nametype = "hidden";
      this.filler.name = "";
    }
  }

  
  delete(){
    this.service.deleteLoan(this.id).subscribe(res=>{});
    this.refreshProfile();
    this.router.navigate(['/profile']);
  }
  

  downloadFile(id:any){
    this.id=id,
    this.service.getLoan(this.id).subscribe(data=>{
      this.loan=data;
      this.docId=this.loan.documentId;
      this.service.getDocument(this.docId).subscribe((data: any)=>{
      const blob = new Blob([data], { type: data.type });
      const url= window.URL.createObjectURL(blob);
      var anchor = document.createElement("a");
      anchor.download = "files";
      anchor.href = url;
      anchor.target = "_blank";
      anchor.click();
      anchor.remove();
    }) }), (error: any) => console.log('Error downloading the file'), () => console.info('File downloaded successfully');
  }
 
  
}
