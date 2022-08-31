import { Component, OnDestroy, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PopoverComponent } from './popover/popover.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit ,OnDestroy{
  userFullImagePath:string;
  private userImagePathSubscription:Subscription;
  constructor(public popoverController:PopoverController,private authService:AuthService) { }
  ngOnDestroy(): void {
    this.userImagePathSubscription.unsubscribe();
  }

  ngOnInit() {
    this.userImagePathSubscription = this.authService.imageFullImagePath.subscribe((fullPath)=>{
      this.userFullImagePath = fullPath;
    })
  }
  
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
