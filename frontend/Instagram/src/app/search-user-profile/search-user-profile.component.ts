import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';

@Component({
  selector: 'app-search-user-profile',
  templateUrl: './search-user-profile.component.html',
  styleUrls: ['./search-user-profile.component.css']
})
export class SearchUserProfileComponent implements OnInit {
  searchUserName:string;
  profileUrl:string='../../assets/avatar2.png';
  firstName:string;
  userDetails:string;
  assigned:boolean =false;
  following =[];
  postsCount;
  followingCount;
  followersCount;
  constructor(private user:UserService,private route:ActivatedRoute,private router:Router) {}

  ngOnInit() {
    this.route.params.subscribe((params)=> {
    this.searchUserName= params.userName;
    this.user.searchUserProfile(params.userName).subscribe((data)=>{
      if(data == "NoUser"){
        this.router.navigate(['/NotFound']);
      }
      this.assigned=false;
      this.profileUrl=data["imageUrl"];
      this.firstName=data["firstName"];
      this.userDetails=data["details"];
      this.user.getFollowing().subscribe((data)=>{this.following=data["following"];
      this.following.forEach((item)=>{
        if(this.searchUserName==item){
          this.assigned=true;
        }
       })
     }); 
    });
    });
   
    this.user.getSearchUserCount(this.searchUserName).subscribe((data)=>{
      console.log(data);
      if(data == null){
        this.followingCount = 0;
        this.followersCount = 0;
      }else{
      this.followingCount = data["following"].length;
      this.followersCount = data["followers"].length;}
    });

   }

   follow(){
     this.user.followUser(this.searchUserName).subscribe((data)=>{console.log(data)});
     this.assigned=true;
     this.followersCount +=1;
   }

   unfollow(){
     this.assigned=false;
     this.user.unfollowUser(this.searchUserName).subscribe(data=>{console.log(data)});
     this.followersCount -=1;
   }
}