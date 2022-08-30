import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreateUser } from './models/create-user.model';
import { User } from './models/user.model';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  @ViewChild('form') form:NgForm;
  submissionType:'login'|'join' = 'join';
  constructor(private authService:AuthService) { }

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
      const newUser:CreateUser = {
        firstName,
        lastName,
        email,
        password
      }
      return this.authService.register(newUser).subscribe((user:User)=>{
        this.toggleText();
      })

    }
  }
  toggleText(){
    if(this.submissionType === 'login') this.submissionType = 'join';
    else if (this.submissionType === 'join') this.submissionType = 'login';
  }

}
