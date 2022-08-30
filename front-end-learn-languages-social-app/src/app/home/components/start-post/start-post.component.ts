import { Component, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventEmitter } from 'stream';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-start-post',
  templateUrl: './start-post.component.html',
  styleUrls: ['./start-post.component.scss'],
})
export class StartPostComponent implements OnInit {
  @Output() create:EventEmitter = new EventEmitter();
  constructor(public modalController:ModalController) { }

  ngOnInit() {}
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
