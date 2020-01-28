import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import { ImageUploadService } from '../image-upload.service';
import { Router} from '@angular/router';
``
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
 userName:string;
 posts:number;
 imageObj: File;
 imageUrl: string;
 firstName;
 profileUrl;
 userDetails;
 images=[];
 postsCount=0;
 followingCount;
 followersCount;
 message;
 uploadMessage;
 constructor(private user:UserService,private imageUploadService: ImageUploadService,private router:Router) { 
 }

  ngOnInit() {
    this.userName=this.user.getUserName();
    this.user.getUserProfile().subscribe((data)=>{
      if(data=="NoUser"){
        this.profileUrl='../../assets/avatar2.png';
        this.message="update profile"
      }else{
      this.profileUrl=data["imageUrl"];
      this.firstName=data["firstName"];
      this.userDetails=data["details"];
    }
    });  
    this.user.getPosts().subscribe((data)=>{
    this.images=data["posts"];
    this.postsCount = this.images.length});
    this.user.getCount().subscribe((data)=>{
      console.log(data);
      if(data == null){
        this.followingCount = 0;
        this.followersCount = 0;
      }else{
      this.followingCount = data["following"].length;
      this.followersCount = data["followers"].length;}
    });
  }

  onImagePicked(event: Event): void {
   const FILE = (event.target as HTMLInputElement).files[0];
   this.imageObj = FILE;
  }

  onImageUpload() {
  this.uploadMessage = "Please Wait while your post is uploading"
   const imageForm = new FormData();
   imageForm.append('image', this.imageObj);
   this.imageUploadService.imageUpload(imageForm).subscribe(res => {
     if(res == null){
       this.uploadMessage = "Select an image";
     }
     else{
  this.uploadMessage = "Post has been successfully uploaded"
   this.imageUrl = res['imageUrl'];
   var post={};
   post["imageUrl"] = this.imageUrl;
   post["Likes"] = 0;
   this.user.submitPosts(post).subscribe((data)=>{
    console.log(data) 
   })
   }});
  }
  
  openPost(data){
    this.user.openPostComp(data);
    this.router.navigate(["/postDetails"]);
  }

}
