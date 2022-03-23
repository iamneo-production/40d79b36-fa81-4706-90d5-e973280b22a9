import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { SharedService } from '../shared.service';


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
  constructor(private formBuilder: FormBuilder,public router: Router) { 
  }
  
  ngOnInit() {
    this.createForm();
  }

  createForm() {    
    this.feedbackForm = this.formBuilder.group({
      msg: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
    
    
  }

  sendFeedback() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.feedbackForm.invalid) {
      return;
    }
    else{
      this.feedbackForm.reset();
      alert('Your feedback is submitted successfully');
      console.log(this.feedbackForm.value);
      this.router.navigateByUrl('home');
    }
    
  }

}


/*sendFeedback() {
    this.sharedService.PostMessage(this.feedbackForm.value).subscribe(() => {
      alert('Your message has been sent.');
      this.router.navigateByUrl('home');
      //this.feedbackForm.reset();
      //this.router.navigateByUrl('home');

    }, (error: any) => {
      console.log('Error', error);
    });*/
