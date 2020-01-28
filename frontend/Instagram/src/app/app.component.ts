import { Component, OnInit } from '@angular/core';
import {UserService} from "./user.service";
import {AuthService} from './auth.service'
import { FormBuilder } from '@angular/forms';
import { Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  userName:string;
  validity:boolean;
  searchForm = this.fb.group({
    Name:['']
  });
  searchBool:boolean = false;
  searchUserName:String;
  route1: string;

  constructor(private user:UserService,private auth:AuthService,private fb: FormBuilder,
    private router:Router){   
    this.user.invokeEvent.subscribe(value => {
      if(value === 'someValue'){
        this.userlogin();
        this.searchBool = true;
      }}); 
    }

  ngOnInit(){
  }

  userlogin(){
    this.validity = this.auth.isAuthenticated();
    if(this.validity == true){
      this.userName =this.user.getUserName();
    }
    
  }

  onSubmit(){
    this.searchUserName = this.searchForm.value;
    this.router.navigate(['/profile',this.searchUserName['Name']]); 
    this.searchForm.reset();
  }

  navi(){
    this.router.navigate(["/profile"]);
    this.searchBool = false;
  }

  naviNews(){
    this.router.navigate(["/newsfeed"]); 
    this.searchBool = true;
  }
  logout(){
    this.user.logoutUser();
    this.validity=false;
    this.searchBool = false;
  }
}
 