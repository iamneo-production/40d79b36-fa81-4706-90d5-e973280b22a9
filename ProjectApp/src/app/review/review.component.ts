import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  feedbackForm!: FormGroup;
  msg: any;
  submitted = false; 
  
  constructor(private formBuilder: FormBuilder) { 
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
    }
    
  }

}

