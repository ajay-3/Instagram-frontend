import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
userName:string;
invokeEvent: Subject<any> = new Subject(); 
postDetails = {};
userNameApp(data){
      this.userName=data;   
}

getUserName():string{
  return this.userName; 
}
callMethodOfSecondComponent() { 
    this.invokeEvent.next("someValue");      
}

submitDetails(data){
  console.log(data);
  return this.http.post("http://localhost:3000/api/userProfile",data,{
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'userName' : this.userName
    })
  })
}

getUserProfile(){
  return this.http.get("http://localhost:3000/api/userProfile",{
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'userName' : this.userName
    })
  });
}

searchUserProfile(data){
  var httphead = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'userName' : data
    })
  };
  return this.http.get("http://localhost:3000/api/userProfile",httphead);
}

submitPosts(data){
  return this.http.post("http://localhost:3000/api/posts",data,{
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'userName' : this.userName
    })
  });
}

getPosts(){
  return this.http.get("http://localhost:3000/api/posts",{
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'userName' : this.userName
    })
  })
}

followUser(data){
   return this.http.post("http://localhost:3000/api/follow",{searchUserName:data},{
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'userName' : this.userName
    })
  });
}

unfollowUser(data){
  return this.http.post("http://localhost:3000/api/unfollow",{searchUserName:data},{
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'userName' : this.userName
    })
  });
}

getFollowing(){
  return this.http.get("http://localhost:3000/api/follow",{
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'userName' : this.userName
    })
  });
}

getNewsFeed(){
  return this.http.get("http://localhost:3000/api/newsfeed",{
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'userName' : this.userName
    })
  });
}

like(data){
  return this.http.put("http://localhost:3000/api/like",data,{
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'userName' : this.userName
    })
  });
}

comment(data){
  return this.http.post("http://localhost:3000/api/comment",data,{
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'userName' : this.userName
    })
});
}

getComment(value,value1){
  return this.http.get("http://localhost:3000/api/comment",{
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'postUserName' : value,
      'imageUrl' : value1
    })
  });
}

getCount(){
  return this.http.get("http://localhost:3000/api/count",{
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'userName' : this.userName
    })
  });
}

getSearchUserCount(data){
  return this.http.get("http://localhost:3000/api/count",{
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'userName' : data
    })
  });
}
getRandomPosts(){
  return this.http.get("http://localhost:3000/api/randomNewsfeed",{
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  })
}

logoutUser(){
  this.userName ='';
  this.auth.validity(false);
  this.router.navigate(["/"])
}

openPostComp(data){
 this.postDetails = data;
}

getPostDetailsComp(){
  return this.postDetails;
}
constructor(private http:HttpClient,private auth:AuthService,private router:Router) { }
}

