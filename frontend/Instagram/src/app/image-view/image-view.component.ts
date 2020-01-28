import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {UserService} from "../user.service";
import {AuthService} from '../auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit {
  userName:string;
  profileUrl='../../assets/avatar2.png';
  imageUrl:string;
  data;
  likesCount:Number;
  comments;
  commentForm=this.fb.group({
    comment:['']});
  commentValue:string;
  commented:boolean=false;

  constructor(private user:UserService,private auth:AuthService,private router:Router,private fb: FormBuilder) { }

  ngOnInit() {
    this.userName = this.user.getUserName();
    this.data = this.user.getPostDetailsComp();
    this.imageUrl = this.data.imageUrl;
    this.likesCount = this.data.Likes;
    this.user.getComment(this.userName,this.imageUrl ).subscribe((data)=> this.comments=data)
  }
  
  submitComment(){
    this.commentValue=this.commentForm.value.comment
    var post = {"postUserName":this.userName,"imageUrl":this.imageUrl,"comment":this.commentForm.value.comment,"userName":this.userName};
    this.user.comment(post).subscribe((res)=>{
      console.log(res);
    });
    this.commented = true;
  }

}
