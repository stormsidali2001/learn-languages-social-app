import { Component, Input, OnInit, SimpleChange, ViewChild } from '@angular/core';
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
  @Input() postBody?:string;
  queryParams:string;
  allLoadedPosts:Post[] = [];
  numberOfPosts = 5;
  offset = 0;
  counter = 1;
  
  constructor(private postService:PostService) { }

  ngOnInit() {
     this.getPosts(null)
  }
  ngOnChanges(changes:SimpleChange){
    const postBody = changes.currentValue.postBody;
    if(!postBody) return;
    this.postService.createPost(postBody).subscribe((post:Post)=>{
      this.allLoadedPosts.unshift(post);
    })
  }
  getPosts(event){
    console.log('counter',this.counter,event,event?.target)
    this.counter++;
    if(this.offset === 25){
      event.target.disabled = true;
    }
    this.postService.getSelectedPosts({offset:this.offset,limit:this.numberOfPosts}).subscribe((posts:Post[])=>{
      this.allLoadedPosts = [...this.allLoadedPosts,...posts];
      if(event){ 
        event.target.complete()
        console.log("completed!!!")
      }
      this.offset+=this.numberOfPosts;

    },err=>{
      console.log(err)
    })

  }
  loadData(event){
    console.log(event)
    this.getPosts(event)
  }

}
