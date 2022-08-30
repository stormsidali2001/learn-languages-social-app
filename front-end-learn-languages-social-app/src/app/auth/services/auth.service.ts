import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/core/dist';
import { BehaviorSubject, Observable } from 'rxjs';
import {take, tap} from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { CreateUser } from '../models/create-user.model';
import { User } from '../models/user.model';
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
         this.userS.next(decodedToken.user);
      })
    )
  }

}
