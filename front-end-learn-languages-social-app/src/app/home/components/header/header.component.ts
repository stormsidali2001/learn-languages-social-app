import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(public popoverController:PopoverController) { }

  ngOnInit() {}
  
  async presentPopover(ev:any){
    const popover = 
  }

}
