import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
  //providers: [SharedService]
})
export class ReviewComponent implements OnInit {

  feedbackForm!: FormGroup;
  msg: any;
  submitted = false; 
  
  //private sharedService: SharedService
  constructor(private formBuilder: FormBuilder, public router: Router, public service: SharedService) { 
  }
  
  ngOnInit() {
    this.createForm();
  }

  createForm() {    
    this.feedbackForm = this.formBuilder.group({
      Message: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]]
    });
    
    
  }

  // sendFeedback() {
  //   this.submitted = true;
  //   // stop here if form is invalid
  //   if (this.feedbackForm.invalid) {
  //     return;
  //   }
  //   else{
  //     this.feedbackForm.reset();
  //     alert('Your feedback is submitted successfully');
  //     console.log(this.feedbackForm.value);
  //     this.router.navigate(['applyloan/home']);
  //   }
    
  // }

  sendFeedback() {
    this.submitted = true;
    if(this.feedbackForm.invalid){
      return;
    }
    this.service.PostMessage(this.feedbackForm.value).subscribe(() => {
      alert('Your message has been sent.');
      this.router.navigate(['applyloan/home']);
    });
  }

}
