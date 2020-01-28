import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ImageUploadService } from '../image-upload.service';
import {UserService} from '../user.service';
import { Router} from '@angular/router';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editProfile=this.fb.group({
    firstName:[''],
    details:['']});
  userName:string;
  imageObj: File;
  imageUrl: string;
  profile={};
  message:String;

  constructor(private fb: FormBuilder,private imageUploadService: ImageUploadService,
    private user:UserService,private router:Router) { 
  }

  ngOnInit() {
    this.userName = this.user.getUserName();
  }

  onImagePicked(event: Event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.imageObj = FILE;
   }
 
   onImageUpload() {
     this.message="please wait while your image is Uploading"
    const imageForm = new FormData();
    imageForm.append('image', this.imageObj);
    this.imageUploadService.imageUpload(imageForm).subscribe(res => {
      this.imageUrl = res['imageUrl'];
    this.message="The Image has been successfully Uploaded"
    });
   }

   uploadDetails(){
    this.profile["firstName"]=this.editProfile.value.firstName;
    this.profile["details"] =this.editProfile.value.details;
    this.profile["imageUrl"]=this.imageUrl;
    this.profile["userName"]=this.userName;
    this.user.submitDetails(this.profile).subscribe((data)=>{
      console.log(data);
    });
    this.router.navigate(["/newsfeed"]);  
   }

}
