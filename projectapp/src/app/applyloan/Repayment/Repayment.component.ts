import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import jsPDF from 'jspdf';
import { SharedService } from 'src/app/shared.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import { DatePipe, formatDate } from '@angular/common';
import * as XLSX from 'xlsx';

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
  emidate: any;
  pdfTable: any;
  showMe: boolean = false;
  date!: string;
  datePipe!: DatePipe;
  dateString!: any;
  dt!: any[];
  tempDate!: any;
  currentdate!: any;
  latest_date!: any;
  fileName = 'repaymentSheet.xlsx';
  tempDate1: any;
  paid!: any;
  public balance!: number;
  interestRate: number = 0.08;
  public terms!: number;
  @ViewChild('Result', { static: false }) el!: ElementRef;
  dateObj!: any;

  constructor(public service: SharedService, private router: Router) { }

  ngOnInit(): void {

  }


  searchFun(val: any) {
    this.getLoan(val.searchId);
    this.showMe = true;

  }

  getValues() {

    var div = <HTMLElement>document.getElementById("Result");

    //in case of a re-calc, clear out the div!
    div.innerHTML = " ";

    //validate inputs - display error if invalid, otherwise, display table
    var balVal = this.validateInputs(this.balance);
    var intrVal = this.validateInputs(this.interestRate);
    this.datePipe = new DatePipe('en-US');
    this.dateString = this.datePipe.transform(new Date(this.date), "MMM yyyy");

    if (balVal && intrVal) {
      //Returns div string if inputs are valid
      div.innerHTML += this.amort(this.balance, this.interestRate, this.terms);
    }
    else {
      //returns error if inputs are invalid
      div.innerHTML += " ";
    }

  }

  /**
   * Amort function:
   * Calculates the necessary elements of the loan using the supplied user input
   * and then displays each months updated amortization schedule on the page
  */
  amort(balance: number, interestRate: number, terms: number) {
    //Calculate the per month interest rate
    let monthlyRate = interestRate / 12;

    //Calculate the payment
    let payment = balance * (monthlyRate / (1 - Math.pow(
      1 + monthlyRate, -terms)));

    this.tempDate1 = this.datePipe.transform(new Date(this.date), "dd");
    if (+this.tempDate1 <= 15) {
      this.emidate = 5;
    }
    else {
      this.emidate = 15;
    }

    this.dateObj = new Date(this.date);
    this.dateObj.setMonth(this.dateObj.getMonth()+(+terms)-1);
    //begin building the return string for the display of the amort table
    let result = "<div><i><b style='margin-left:18%' >Loan amount:</b></i>₹" + balance + "<br /> " +
      "<i><b style='margin-left:18%'>Interest rate: </b></i>" + (interestRate * 100) + "%<br />" +
      "<i><b style='margin-left:18%'>Number of months: </b></i>" + terms + "<br />" +
      "<i><b style='margin-left:18%'>Monthly payment: </b></i>₹" + Math.round(payment) + "<br />" +
      "<i><b style='margin-left:18%'>Total paid: </b></i>₹" + Math.round(payment * terms) + "<br />" +
      "<i><b style='margin-left:18%'>EMI Payment Date: </b></i>" + this.emidate + "th of every month.<br />" +
      "<i><b style='margin-left:18%'>Start Date: </b></i>" + this.date + "<br />" +
      "<i><b style='margin-left:18%'>End Date: </b></i>" + this.datePipe.transform( this.dateObj.setDate(this.emidate),"MMMM-dd-yyyy") + "<br /><br /></div>";

    //add header row for table to return string
    result += "<table id='resultTable' class='table table-striped' style='align:left;'  border='1'><tr align=center><th style='background-color:Tomato;' >S.No </th><th style='background-color:Tomato;' > EMI Month </th>" +
      "<th style='background-color:Tomato;'>Interest</th><th style='background-color:Tomato;'>Principal</th><th style='background-color:Tomato;'>EMI Amount</th><th style='background-color:Tomato;'>Remaining Balance</th><th style='background-color:Tomato;'>Repayment</th>"+
      "<th style='background-color:Tomato;'>Pre-Closure</th>";

    /**
     * Loop that calculates the monthly Loan amortization amounts then adds
     * them to the return string
     */

    for (var count = 0; count < terms; ++count) {
      //in-loop interest amount holder
      var interest = 0;

      //in-loop monthly principal amount holder
      var monthlyPrincipal = 0;

      //start a new table row on each loop iteration
      result += "<tr align='center'>";

      //display the month number in col 1 using the loop count variable
      result += "<td >" + (count + 1) + "</td>";
      result += "<td>" +'​'+this.dateString+ "</td>";
      this.tempDate = this.datePipe.transform(new Date(this.dateString), "M yyyy");
      // console.log(this.dateString);
      this.dt = this.tempDate.split(" ");
      this.dt[0] = +this.dt[0];
      this.dt[1] = +this.dt[1];
      if (this.dt[0] == 12) {
        this.dt[0] = 0;
        this.dt[1] += 1;
      }
      this.dateString = this.datePipe.transform(new Date(this.dt[1], this.dt[0]), "MMM yyyy");

      //calc the in-loop interest amount and display
      interest = balance * monthlyRate;
      result += "<td> " + Math.round(interest) + "</td>";

      //calc the in-loop monthly principal and display
      monthlyPrincipal = payment - interest;
      result += "<td> " + Math.round(monthlyPrincipal) + "</td>";

      result += "<td>" + Math.round(payment) + "</td>";

      balance = balance - monthlyPrincipal;
      //code for displaying in loop balance
      result += "<td > " + Math.round(balance) + "</td>";

      if ((new Date()).getTime() >= (new Date(this.dateString).getTime()) || ( ((new Date()).getTime()) >= new Date(this.dt[1], this.dt[0], this.emidate).getTime())) {
        this.paid="paid";
        result += "<td> Paid</td>"
      }
      else {
        this.paid="Not paid";
        result += "<td> Not Paid</td>"
      }

      //code for pre-Closure
      if(count>=12 && this.paid=="Not paid"){
        result += "<td > " + Math.round(balance+(balance*0.03)) + "</td>";
      }
      else{
        result += "<td> Not Allowed</td>"
      }


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


  makePDF() {
    const pdfTable = this.el.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download("RepaymentSchedule");
  }

  exportexcel(): void {
    
    var table = <HTMLElement>document.getElementById("resultTable");
    /* pass here the table id */
    
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

  validateInputs(value: any) {
    //some code here to validate inputs
    if ((value == null) || (value == "")) {
      return false;
    }
    else {
      return true;
    }
  }


  getLoan(id: any) {
    this.loanId = id;

    this.service.getLoan(id).subscribe(res => {

    this.loan = res;
    if (res == null) {
      this.messageSet = true;
      this.loanSet = false;
      }
    else {
      this.loanSet = true;
      this.messageSet = false;
      this.balance = this.loan.loanAmountRequired;
      this.date = this.loan.TimestampofLoan;
      this.terms = this.loan.LoanRepaymentMonths;
    }
    this.getValues();
    })
  }
}
