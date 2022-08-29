import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
})
export class AllPostsComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll:IonInfiniteScroll

  queryParams:string;
  allLoadedPosts:Post[] = [];
  numberOfPosts = 5;
  offset = 0;
  
  constructor(private postService:PostService) { }

  ngOnInit() {
    this.getPosts(true,null)
  }
  getPosts(isInitialLoad:boolean,event){
    if(this.offset === 20){
      event.target.disabled = true;
    }
    this.postService.getSelectedPosts({offset:this.offset,limit:this.numberOfPosts}).subscribe((posts:Post[])=>{
      this.allLoadedPosts = [...this.allLoadedPosts,...posts];
      if(isInitialLoad) event.target.complete;
      this.offset+=5;
    },err=>{
      console.log(err)
    })

  }
  loadData(event){
    this.getPosts(false,event)
  }

}
