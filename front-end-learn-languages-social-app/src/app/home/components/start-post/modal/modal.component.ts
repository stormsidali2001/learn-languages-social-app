import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit ,OnDestroy{
  @ViewChild('form') form:NgForm;
  @Input() postId?:number;
  userFullImagePath:string;
  fullName$ = new BehaviorSubject<string>(null);
  fullName = '';
  private userImagePathSubscription:Subscription;
  constructor(public modalController:ModalController,private authService:AuthService) {
   
   }
   
   ngOnInit() {
    this.userImagePathSubscription = this.authService.imageFullImagePath.subscribe((fullPath)=>{
      this.userFullImagePath = fullPath;
    })
    this.authService.userFullName.pipe(take(1)).subscribe((fullName:string)=>{
      this.fullName = fullName;
      this.fullName$.next(fullName);
    })

   }
   ngOnDestroy(): void {
     this.userImagePathSubscription.unsubscribe();
   }
  onPost(){
    if(!this.form.valid) return;
    const body = this.form.value['body'];
    this.modalController.dismiss({
      post:{
        body,
        createdAt:new Date()
      }
    },'post')
  }
  onDismiss(){
    this.modalController.dismiss(null
      ,'dismiss'  //the name of the role
    );
  }

}
