import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit ,OnDestroy{
  userFullImagePath:string;
  fullName$ = new BehaviorSubject<string>(null);
  fullName = '';
  private userImagePathSubscription:Subscription;

  constructor(private authService:AuthService) { }
  ngOnDestroy(): void {
    this.userImagePathSubscription.unsubscribe();
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
  onSignOut(){
     this.authService.logout()
  }

}
