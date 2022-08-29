import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  @ViewChild('form') form:NgForm;
  submissionType:'login'|'join' = 'join';
  constructor() { }

  ngOnInit() {
  }
  onSubmit(){
    const {email,password} = this.form.value;
    if(!email || !password) return;
    if(this.submissionType === 'login') {
      console.log('login: ',{email,password})
    }
    else if (this.submissionType === 'join') {
      const {firstName,lastName} = this.form.value;
      console.log('join: ',{firstName,lastName,email,password})
      if(!firstName || !lastName) return;

    }
  }
  toggleText(){
    if(this.submissionType === 'login') this.submissionType = 'join';
    else if (this.submissionType === 'join') this.submissionType = 'login';
  }

}
