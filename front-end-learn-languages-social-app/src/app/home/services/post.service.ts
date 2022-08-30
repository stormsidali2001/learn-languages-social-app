import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Post } from '../models/Post';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http:HttpClient) {
  }
  getSelectedPosts({offset,limit}:{offset:number,limit:number}){
    return this.http.get<Post[]>(`${environment.baseApiUrl}/feed?offset=${offset}&limit=${limit}`)
  }
}
