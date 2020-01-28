import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import {AuthService} from '../../auth.service';
import {UserService} from '../../user.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  valid:String;
  message;
  loginForm = this.fb.group({
    Name: ['',[Validators.required,Validators.minLength(3)]],
    Password:['',[Validators.required,Validators.minLength(8)]]
  });

  constructor(private fb: FormBuilder,private auth:AuthService,private router:Router,private user:UserService) { }

  ngOnInit() {
  }
  onSubmit(){
    this.auth.loginUser(this.loginForm.value).subscribe((data)=>{
      this.valid=data["validity"];
      this.message= data["message"];
      if(this.valid == "true"){
        this.user.userNameApp(this.loginForm.get('Name').value);  
        this.auth.validity(this.valid);
        this.user.callMethodOfSecondComponent(); 
        this.router.navigate(["/newsfeed"]);
      }
    }
    );
  }
}
