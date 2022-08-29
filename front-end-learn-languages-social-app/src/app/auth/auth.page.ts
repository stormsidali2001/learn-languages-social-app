import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  @ViewChild('form') form:NgForm;
  submissionType:'login'|'join' = 'login';
  constructor() { }

  ngOnInit() {
  }
  onSubmit(){

  }
  toggleText(){
    if(this.submissionType === 'login') this.submissionType = 'join';
    else if (this.submissionType === 'join') this.submissionType = 'login';
  }

}
