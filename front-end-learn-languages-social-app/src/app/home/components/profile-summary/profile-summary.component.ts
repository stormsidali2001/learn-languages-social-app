import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { fromBuffer ,FileTypeResult} from 'file-type/core';
import { BehaviorSubject, from, of, Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Role } from 'src/app/auth/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';

type ValidFileExtension = 'png' | 'jpg' | 'jpeg';
type ValidMimeType = `image/${ValidFileExtension}`;

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
export class ProfileSummaryComponent implements OnInit ,OnDestroy{
  form:FormGroup;
  userFullImagePath:string;
  fullName$ = new BehaviorSubject<string>(null);
  fullName = '';
  private userSubscription:Subscription;
  bannerColors:BannerColors ={
    color1:'#a0b4b7',
    color2:'#dbe7e9',
    color3:'#bfd3d6',
    
  };
  validFileExtensions:ValidFileExtension[]=['jpeg','png','jpg'];
  validMimeTypes:ValidMimeType[] = ['image/jpeg','image/jpg','image/png']

  constructor(private authService:AuthService) { }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit() {

    this.form = new FormGroup({
      file:new FormControl(null)
    });

    this.authService.getUserRole.pipe(take(1)).subscribe((role:Role)=>{
      console.log('role is',role)
      this.bannerColors = this.getBannerColors(role);
    });

    this.userSubscription = this.authService.imageFullImagePath.subscribe((fullImagePath:string)=>{
      this.userFullImagePath = fullImagePath;
    })

    this.authService.userFullName.pipe(take(1)).subscribe((fullName:string)=>{
      this.fullName = fullName;
      this.fullName$.next(fullName);
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
  onFileSelect(event:Event):void{
    console.log('selected')
    const file:File = (event.target as HTMLInputElement).files[0];
    if(!file) return;
    
    const formData = new FormData();
    formData.append('file',file);
    from(file.arrayBuffer())
    .pipe(
      switchMap((buffer:Buffer)=>{
        return  from(fromBuffer(buffer)).pipe(
          switchMap(
            (fileTypeResult:FileTypeResult)=>{
              if(!fileTypeResult){
                console.log({error:'file format not supported'})
                return of();
              }
              const {ext,mime} = fileTypeResult;
              const safe = this.validFileExtensions.includes(<ValidFileExtension>ext) 
                          && 
                          this.validMimeTypes.includes(<ValidMimeType>mime);
              if(!safe){
                console.log({error:'file format does not match file extension'})
                return of();
              }
              return this.authService.uploadUserImage(formData);
            }
          )
        )
      })
    ).subscribe();
    this.form.reset();

  }

}
