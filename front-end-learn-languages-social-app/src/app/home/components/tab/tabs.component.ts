import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../start-post/modal/modal.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

  constructor(public modalController:ModalController) { }

  ngOnInit() {}

  async presentModal(){
    const modal = await this.modalController.create({
      component:ModalComponent,
      cssClass:'my-custom-class2',
    });
    await modal.present();
    const {data,role} = await modal.onDidDismiss();
    if(data){
      console.log('modal data:',data,'role',role)
    }
    console.log(role)
  }

}
