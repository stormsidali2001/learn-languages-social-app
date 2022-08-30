import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanLoad {
  constructor(private authService:AuthService , private router:Router){}
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.isUserLoggedIn.pipe(
      take(1),
      switchMap((isUserLoggedIn:boolean)=>{
        console.log(isUserLoggedIn)
          if(isUserLoggedIn) return of(isUserLoggedIn);

      }),
      tap(
        (isUserLoggedIn:boolean)=>{
          if(!isUserLoggedIn){
            this.router.navigateByUrl('/auth');
          }

      }
      )
      
    )
  }
  
  
}
