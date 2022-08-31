import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/core/dist';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import {map, switchMap, take, tap} from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { CreateUser } from '../models/create-user.model';
import { Role, User } from '../models/user.model';
import { UserResponse } from '../models/user.reponse';
import jwt_decode from 'jwt-decode';
import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userS = new BehaviorSubject<User>(null);
  //we used the behavior subject instead of a normal subject cuz the normal subject won't allow us to call
  //the next method before subscribing to it.
  private httpOptions:{headers:HttpHeaders} = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(
      private http:HttpClient , 
      private router:Router
    ) { }
    
    get isUserLoggedIn():Observable<boolean>{
      return this.userS.asObservable()
      .pipe(
        switchMap(
          (user:User)=>{
            const isUserAuthenticated:boolean = user !== null;
            return of(isUserAuthenticated);
          }
        )
      )
    }
    get getUserRole():Observable<Role>{
      return this.userS.asObservable()
      .pipe(
        switchMap(
          (user:User)=>{
            return of(user.role)
          }
        )
      )
    }
    get getUserId():Observable<number>{
      return this.userS.asObservable()
      .pipe(
        switchMap(
          (user:User)=>{
            return of(user.sub)
          }
        )
      )
    }
    get userStream():Observable<User>{
      return this.userS.asObservable();
    }
    get imageFullImagePath():Observable<string>{
      return this.userS.asObservable().pipe(
        switchMap( (user:User)=>{
          const authorHasImage = !!user.imagePath;
          let fullImagePath = this.getDefaultFullImagePath();
          if(authorHasImage){
            fullImagePath = this.getFullImagePath(user.imagePath);
          }
          return of(fullImagePath);

        })
      )
    }
  
    get userFullName():Observable<string>{
      return this.userS.asObservable().pipe(
        switchMap(
          (user:User)=>{
            const fullName = user.firstName + ' ' + user.lastName;
            return of(fullName);
          }
        )
      )
    }
    updateUserImagePath(imagePath:string):Observable<User>{
      return this.userS.pipe(
        take(1),
        map((user:User)=>{
          user.imagePath = imagePath;
          this.userS.next(user);
          return user;
        })
      )
    }
    
    getDefaultFullImagePath():string{
      return `${environment.baseApiUrl}/feed/image-name/blank-profile-picture.png`
    }
    getFullImagePath(imageName:string):string{
      return `${environment.baseApiUrl}/feed/image-name/${imageName}`
    }


    register(newUser:CreateUser):Observable<User>{
      return this.http.post<User>(`${environment.baseApiUrl}/auth/register`,newUser,this.httpOptions).pipe(
        take(1)
      )
    }
    login(email:string,password:string):Observable<{access_token:string}>{
      return this.http.post<{access_token:string}>(`${environment.baseApiUrl}/auth/login`,{email,password},this.httpOptions).pipe(
        take(1),
        tap((response:{access_token:string})=>{
        
          Preferences.set({
            key:'token',
            value:response.access_token
        });
          const decodedToken:UserResponse = jwt_decode(response.access_token);
          console.log(decodedToken)
          this.userS.next(decodedToken.user);
        })
      )
    }
    isTokenInStorage():Observable<boolean>{
       return from(Preferences.get({key:'token'})).pipe(
        map((data:{value:string})=>{
          console.log(data)
          if(!data || !data.value) return null;

          const decondedToken:UserResponse =  jwt_decode(data.value)
          console.log("decoded jwt",decondedToken)
          const jwtExpiration = decondedToken.exp*1000;
          const isExpired = new Date() > new Date(jwtExpiration);
          console.log('isExpired',isExpired,'decoded user',decondedToken.user)
          if(isExpired) return null;
          if(decondedToken.user){
            console.log('new userS' , decondedToken)
            this.userS.next(decondedToken.user);
            return true;
          }
        })
       )
    }
    logout():void{
        this.userS.next(null);
        Preferences.remove({key:'token'})
        this.router.navigateByUrl('/auth');
    }
    getUserImage(){
      return this.http.get(`${environment.baseApiUrl}/users/image`).pipe(take(1))
    }
    getUserImageName():Observable<{imageName:string}>{
      return this.http.get<{imageName:string}>(`${environment.baseApiUrl}/users/image`).pipe(take(1))
    }
    uploadUserImage(formData:FormData):Observable<{modifiedFileName:string}>{
       return this.http.post<{modifiedFileName:string}>(`${environment.baseApiUrl}/users/upload`,formData)
       .pipe(
        tap(
          ({modifiedFileName})=>{
            let user = this.userS.value;
            user.imagePath = modifiedFileName;
            this.userS.next(user);
          }
        )
      )
    } 
  
}
