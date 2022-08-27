import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(public popoverController:PopoverController) { }

  ngOnInit() {}
  
  async presentPopover(ev:any){
    const popover = await this.popoverController.create({
      component:PopoverComponent,
      cssClass:"my-custom-class",
      event:ev,
      // translucent:true 
      showBackdrop:false
    })
    await popover.present();
    const {role} = await popover.onDidDismiss(); //when clicking on something else.
    console.log("onDionDidDismiss resolved with role",role)
  }

}
