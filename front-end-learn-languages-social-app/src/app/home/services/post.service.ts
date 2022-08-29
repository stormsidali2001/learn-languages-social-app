import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Post } from '../models/Post';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http:HttpClient) {
  }
  getSelectedPosts({offset,limit}:{offset:number,limit:number}){
    return this.http.get<Post[]>(`http://localhost:8080/api/feed?offset=${offset}&limit=${limit}`)
  }
}
