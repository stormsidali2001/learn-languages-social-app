import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Post } from '../models/Post';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http:HttpClient) {
  }
  private httpOptions :{headers:HttpHeaders} = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }
  getSelectedPosts({offset,limit}:{offset:number,limit:number}){
    return this.http.get<Post[]>(`${environment.baseApiUrl}/feed?offset=${offset}&limit=${limit}`)
  }
  createPost(body:string){
    return this.http.post<Post>(`${environment.baseApiUrl}/feed`,{
      body
    },this.httpOptions).pipe(take(1))
  }
  updatePost(postId:number,body:string){
    return this.http.put(`${environment.baseApiUrl}/feed/${postId}`,{
      body
    },this.httpOptions).pipe(take(1))
  }
  deletePost(postId:number){
    return this.http.delete(`${environment.baseApiUrl}/feed/${postId}`,this.httpOptions).pipe(take(1));
  }
}
