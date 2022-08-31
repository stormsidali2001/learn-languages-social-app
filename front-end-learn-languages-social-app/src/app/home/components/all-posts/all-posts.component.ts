import { Component, Input, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { BehaviorSubject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from 'src/app/auth/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Post } from '../../models/Post';
import { PostService } from '../../services/post.service';
import { ModalComponent } from '../start-post/modal/modal.component';

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
  private userSubscription:Subscription;

  userId$ = new BehaviorSubject<number>(null)
  
  constructor(
    private postService:PostService,
    private authService:AuthService,
    public modalController:ModalController
    ) { }

  ngOnInit() {
     this.userSubscription = this.authService.userStream.subscribe(
      (user:User)=>{

        this.allLoadedPosts.forEach((post:Post,index:number)=>{
          //if the user changes his profil picture for example the update should be shown instantly
        
          if(user?.imagePath && post.author['id'] === user.sub){
            this.allLoadedPosts[index]['fullImagePath'] = this.authService.getFullImagePath(user.imagePath);
          }
        })
        console.log(user,this.allLoadedPosts)
      }
     )

     this.getPosts(null)
     this.authService.getUserId.pipe(take(1)).subscribe((userId:number)=>{
      this.userId$.next(userId);
     })

  }
  ngOnChanges(changes){
    console.log(changes)
    const postBody = changes.postBody.currentValue;
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
      this.allLoadedPosts = [...this.allLoadedPosts,
        ...posts.map(post=>{
          const authorHasImage =  !!post.author?.imagePath;
          let fullImagePath = this.authService.getDefaultFullImagePath();
          if(authorHasImage){
            fullImagePath = this.authService.getFullImagePath(post.author.imagePath);
          }
          const newPost = {...post,fullImagePath}
          return newPost;
        })
      ];
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
  async presentUpdate(postId:number){
    console.log('edit post')
    const modal = await this.modalController.create({
      component:ModalComponent,
      cssClass:'my-custom-class2',
      componentProps:{
        postId,
      }
    });
    await modal.present();
    const {data,role} = await modal.onDidDismiss();
    if(!data) return;
    const newPostBody = data.post.body;
    console.log('new body',newPostBody, this.allLoadedPosts)
    this.postService.updatePost(postId,newPostBody).subscribe(()=>{
      const postIndex = this.allLoadedPosts.findIndex(p=>p.id === postId);
      console.log(postIndex)
      this.allLoadedPosts[postIndex].body = newPostBody;
    })
    console.log('modal data:',data,'role',role)
    console.log(role)

  }
  deletePost(postId:number){
    this.postService.deletePost(postId).subscribe(()=>{
      this.allLoadedPosts = this.allLoadedPosts.filter(p=>p.id!== postId)
    })
  }

}
