import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventEmitter } from '@angular/core'
import { ModalComponent } from './modal/modal.component';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-start-post',
  templateUrl: './start-post.component.html',
  styleUrls: ['./start-post.component.scss'],
})
export class StartPostComponent implements OnInit ,OnDestroy{
  @Output() create = new EventEmitter()
  userFullImagePath:string;
  private userImagePathSubscription:Subscription;
  constructor(public modalController:ModalController,private authService:AuthService) { }
  ngOnDestroy(): void {
    this.userImagePathSubscription.unsubscribe();
  }

  ngOnInit() {
    this.userImagePathSubscription = this.authService.imageFullImagePath.subscribe((fullPath)=>{
        this.userFullImagePath = fullPath;
    })
  }
  async presentModal(){
    console.log('creating a post')
    const modal = await this.modalController.create({
      component:ModalComponent,
      cssClass:'my-custom-class2',
    });
    await modal.present();
    const {data,role} = await modal.onDidDismiss();
    if(!data) return;
    console.log('modal data:',data,'role',role)
    this.create.emit(data.post.body);
    console.log(role)
  }
}
