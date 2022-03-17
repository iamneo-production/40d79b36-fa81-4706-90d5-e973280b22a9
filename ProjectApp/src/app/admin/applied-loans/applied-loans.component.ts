import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-applied-loans',
  templateUrl: './applied-loans.component.html',
  styleUrls: ['./applied-loans.component.css']
})
export class AppliedLoansComponent implements OnInit {

  loans!: any;

  constructor(private service: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.refreshPage();
  }

  refreshPage(){
    this.service.getAllLoans().subscribe(res => {
      this.loans = res;
      console.log(this.loans);
    });
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

  accept(id: any){
    this.service.updateStatus(id, true).subscribe(res => {
      alert("Loan ID: "+id+" accepted");
      this.refreshPage();
    });
  }

  reject(id: any){
    this.service.updateStatus(id, false).subscribe(res => {
      alert("Loan ID: "+id+" rejected");
      this.refreshPage();
    });
  }


}
