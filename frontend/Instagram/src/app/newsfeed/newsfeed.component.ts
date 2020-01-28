import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {UserService} from "../user.service";
import {AuthService} from '../auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  userName:string;
  images:Array<any>=[];
  commentBool=false;
  comments;
  commented:boolean;
  message:string;
  commentForm=this.fb.group({
    comment:['']});
  commentValue:String;
  commentIndex:Number;

  constructor(private user:UserService,private auth:AuthService,private router:Router,private fb: FormBuilder) { }

  ngOnInit() {
    this.user.getNewsFeed().subscribe((data)=>{  
      console.log(data)
      if(data==null){
        console.log("entered")
         var obj = {'userName':"Instagram Team",'post':{"imageUrl":'../assets/welcome.webp'}}
          this.images.push(obj);
      }else{
        var arr1 = Object.keys(data);
        for(let i=0;i<arr1.length;i++){
           this.images.push(data[i]);
         }
      }
     });
     this.userName = this.user.getUserName();
  }

  like(data,index){
    document.getElementById("btn-"+index).innerHTML="Liked";
    var post = {"postUserName":data.userName,"imageUrl":data.post.imageUrl}
    this.user.like(post).subscribe((res)=>{
      console.log(res);
    });
  }

  comment(data,index){
    this.commentBool=true;
    this.commentIndex = index;
    this.user.getComment(data.userName,data.post.imageUrl ).subscribe((res)=>{
         this.comments=res;
    })  
  }

  submitComment(data){  
    this.commentBool=false;
    this.commentValue = this.commentForm.value.comment;
    var post = {"postUserName":data.userName,"imageUrl":data.post.imageUrl,"comment":this.commentForm.value.comment,"userName":this.userName};
    this.user.comment(post).subscribe((res)=>{
      console.log(res);  
    });  
    this.commented = true;
    this.commentForm.reset();
  }
}


