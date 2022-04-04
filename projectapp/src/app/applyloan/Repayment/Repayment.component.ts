import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import jsPDF from 'jspdf';
import {SharedService} from 'src/app/shared.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import { DatePipe, formatDate } from '@angular/common';
// https://www.freakyjolly.com/how-to-export-pdf-from-html-in-angular-12/
@Component({
  selector: 'app-Repayment',
  templateUrl: './Repayment.component.html',
  styleUrls: ['./Repayment.component.css']
})
export class RepaymentComponent implements OnInit {

  loanId: any;
  loan: any;
  temp: any = {};
  loanSet: boolean = false;
  messageSet: boolean = false;
  event1: any;
  pdfTable: any;
  showMe:boolean=false;
  date!:string;
  datePipe!: DatePipe;
  dateString! : any;
  dt!: any [];
  tempDate!: any;
  currentdate! : any;
  latest_date!:any;



  constructor(public service:SharedService, private router: Router) {}

  ngOnInit(): void {

    }


  searchFun(val:any){
    this.getLoan(val.searchId);
    this.showMe=!this.showMe;

  }



  public balance!:number;
  interestRate: number=0.08;
  public terms!:number;


  /*updatePrincipal(event:any){
    this.balance = event.target.value;
  }

  updateInterestRate(event:any){
    this.interestRate = event.target.value/100;
  }

  updatePeriod(event:any){
    this.terms = event.target.value;
  }*/


  getValues()
  {
    //button click gets values from inputs
   // let balance = 10000;
   // let interestRate1 =<HTMLElement>document.getElementById("interest");
   // let interestRate=Number(interestRate1)/100;
   // let terms = <HTMLElement>document.getElementById("terms");

    //set the div string
    var div = <HTMLElement>document.getElementById ("Result");

    //in case of a re-calc, clear out the div!
    div.innerHTML = " ";

    //validate inputs - display error if invalid, otherwise, display table
    var balVal = this.validateInputs(this.balance);
    var intrVal = this.validateInputs(this.interestRate);


    if (balVal && intrVal)
    {
      //Returns div string if inputs are valid
      div.innerHTML += this.amort(this.balance, this.interestRate, this.terms);
    }
    else
    {
      //returns error if inputs are invalid
      div.innerHTML += " ";
    }

  }

  /**
   * Amort function:
   * Calculates the necessary elements of the loan using the supplied user input
   * and then displays each months updated amortization schedule on the page
  */



  amort(balance:number, interestRate: number, terms:number)
  {
      //Calculate the per month interest rate
    let monthlyRate = interestRate/12;

    //Calculate the payment
      let payment = balance * (monthlyRate/(1-Math.pow(
          1+monthlyRate, -terms)));

    //begin building the return string for the display of the amort table
      let result = "<div><i><b style='margin-left:18%' >Loan amount:</b></i>₹" + balance +  "<br /> " +
          "<i><b style='margin-left:18%'>Interest rate: </b></i>" + (interestRate*100) +  "%<br />" +
          "<i><b style='margin-left:18%'>Number of months: </b></i>" + terms + "<br />" +
          "<i><b style='margin-left:18%'>Monthly payment: </b></i>₹" +Math.round( payment) + "<br />" +
          "<i><b style='margin-left:18%'>Total paid: </b></i>₹" + Math.round(payment * terms) + "<br /><br /></div>";

      //add header row for table to return string
    result += "<table  class='table table-striped' style='align:left;'  border='1'><tr align=center>" +
          "<th style='background-color:Tomato;'>Monthly Interest</th><th style='background-color:Tomato;'>Monthly Principal</th><th style='background-color:Tomato;'>Monthly Payment</th><th style='background-color:Tomato;'>Remaining Balance</th>";

      /**
       * Loop that calculates the monthly Loan amortization amounts then adds
       * them to the return string
       */

    for (var count = 0; count < terms; ++count)
    {
      //in-loop interest amount holder
      var interest = 0;

      //in-loop monthly principal amount holder
      var monthlyPrincipal = 0;

      //start a new table row on each loop iteration
      result += "<tr align='center'>";

      //display the month number in col 1 using the loop count variable


      // result += "<td >" + (count + 1) + "</td>";


      //calc the in-loop interest amount and display
      interest = balance * monthlyRate;
      result += "<td> " + Math.round( interest) + "</td>";

      //calc the in-loop monthly principal and display
      monthlyPrincipal = payment - interest;
      result += "<td> " + Math.round( monthlyPrincipal )+ "</td>";

      result+="<td>"+Math.round(payment)+"</td>";

      balance=balance-monthlyPrincipal;
      //code for displaying in loop balance
      result += "<td > " +Math.round( balance) + "</td>";


      //end the table row on each iteration of the loop
      result += "</tr>";

      //update the balance for each loop iteration
      //balance =balance - monthlyPrincipal;
    }

    //Final piece added to return string before returning it - closes the table
      result += "</table>";

    //returns the concatenated string to the page
      return result;
  }


  @ViewChild('Result',{static:false}) el!:ElementRef;

  makePDF(){
    const pdfTable = this.el.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download("RepaymentSchedule");
      //  let pdf=new jsPDF('p','mm','a4',true);
      //  pdf.html(this.el.nativeElement,{
      //    callback:(pdf)=>{
      //      pdf.save("RepaymentSchedule.pdf");
      //    }
      //  });
  }



  validateInputs(value:any)
  {
    //some code here to validate inputs
    if ((value == null) || (value == ""))
    {
      return false;
    }
    else
    {
      return true;
    }
  }


  getLoan(id:any){
    this.loanId=id;

    this.service.getLoan(id).subscribe(res =>{

      this.loan=res;



      if(res==null ){
        this.messageSet=true;
        this.loanSet=false;

      }
      else{
        this.loanSet = true;
        this.messageSet = false;
        this.balance=this.loan.loanAmountRequired;
        this.terms=this.loan.LoanRepaymentMonths;

      }
      this.getValues();


    })
  }




}

/*calcuateInterest(){
    //this.totalAmount = this.principal * (1 + (this.interestRate/100 * this.period));
    this.monthlyRate=Number(this.interestRate)/(12*100);
    this.oneplusR=Math.pow(1+this.monthlyRate,Number(this.period));
    this.denominator=this.oneplusR-1;

    this.totalAmount=(this.principal)((this.monthlyRate)(this.oneplusR/this.denominator));
    this.interestAmount = ((this.principal * Number(this.interestRate)*(this.period/12)) / 100 ) / (this.period);

    this.principalAmount=this.totalAmount-this.interestAmount;
    this.balanceAmount=
    this.principal-this.principalAmount;
    this.totalAmount=Math.round(this.totalAmount);
    this.interestAmount=Math.round(this.interestAmount);
    this.principalAmount=Math.round(this.principalAmount);
    this.balanceAmount=Math.round(this.balanceAmount);
    //this.totalAmount=(this.principal)*((this.interestRate*Math.pow((1+this.interestRate),this.period))/ (Math.pow((1+this.interestRate),this.period)-1))

  }*/
