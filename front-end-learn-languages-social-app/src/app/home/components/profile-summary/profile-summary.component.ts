import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Role } from 'src/app/auth/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';

type BannerColors = {
  color1:string;
  color2:string;
  color3:string;
}
@Component({
  selector: 'app-profile-summary',
  templateUrl: './profile-summary.component.html',
  styleUrls: ['./profile-summary.component.scss'],
})
export class ProfileSummaryComponent implements OnInit {
  bannerColors:BannerColors ={
    color1:'#a0b4b7',
    color2:'#dbe7e9',
    color3:'#bfd3d6',
    
  };

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.authService.getUserRole.pipe(take(1)).subscribe((role:Role)=>{
      console.log('role is',role)
      this.bannerColors = this.getBannerColors(role);
    })
  }
  private getBannerColors(role:Role):BannerColors{
    switch (role) {
    case 'user':
        return {
          color1:'#a0b4b7',
          color2:'#dbe7e9',
          color3:'#bfd3d6',
        }
      break;
    case 'premium':
      return {
        color1:'#bc8f8f',
        color2:'#c09999',
        color3:'#ddadaf',
      }
        
        break;
      case 'admin':
          return {
            color1:'#daa528',
            color2:'#f0e68c',
            color3:'#fafad2',
          }
        break;
    
    
    }
  }

}
