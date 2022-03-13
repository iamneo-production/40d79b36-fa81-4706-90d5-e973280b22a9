import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { NONE_TYPE } from '@angular/compiler';
import { HttpClient, HttpEventType, HttpProgressEvent, HttpUploadProgressEvent } from '@angular/common/http';

@Component({
  selector: 'app-addloan',
  templateUrl: './addloan.component.html',
  styleUrls: ['./addloan.component.css']
})
export class AddloanComponent  {

  user: any = {};
  email!: any;
  fileToUpload!: File;
  docId!: any;
  selected!: any;
  download: boolean = false;
  progress!: any;
  displayProgress: boolean = false;
  constructor(private service: SharedService, private router: Router, private http:HttpClient){}

  ngOnInit(): void
  {
    this.service.getUser(sessionStorage.getItem("UserId")).subscribe(res=>{
      this.email = res.email;
    });
  }

  onSelectType(event: any){
    this.selected = event.target.value;
  }

  onSelectFile(event: any) {  
    let formData = new FormData();
    this.fileToUpload = event.target.files.item(0);
    formData.append("type", this.selected);
    formData.append("file", this.fileToUpload);
    this.service.addDocument(formData).subscribe( (res: any) =>{
      if(res.type == HttpEventType.UploadProgress){
        this.displayProgress = true;
        this.progress = Math.round((100 * res.loaded) / res.total);
      }else if (res.type == HttpEventType.Response){
        this.displayProgress = false;
        this.docId = res.body;
        this.download = true;
      }
    })
  } 
  
  downloadFile(){
    this.service.getDocument(this.docId).subscribe((data: any)=>{
      const blob = new Blob([data], { type: data.type });
      const url= window.URL.createObjectURL(blob);
      var anchor = document.createElement("a");
      anchor.download = "files";
      anchor.href = url;
      anchor.target = "_blank";
      anchor.click();
      anchor.remove();
    }), (error: any) => console.log('Error downloading the file'), () => console.info('File downloaded successfully');
  }

  onClickSubmit(value: any){
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
      LoanRepaymentMonths:value.months,
      documentId: parseInt(this.docId.toString())
    };

    this.service.addLoan(loanapp).subscribe(res=>{
      alert(res.toString());
      this.router.navigate(['/profile']);
    });
  }
}