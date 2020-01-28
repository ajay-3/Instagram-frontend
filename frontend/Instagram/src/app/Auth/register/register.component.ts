import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import {AuthService} from '../../auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  message;
  registrationForm = this.fb.group({
    Name: ['',[Validators.required,Validators.minLength(3)]],
    Email:['',[Validators.required]],
    Password:['',[Validators.required,Validators.minLength(8)]]
  });

  constructor(private fb:FormBuilder,private auth:AuthService,private router:Router) { 
  }
  
  register(){
    this.auth.registerUser(this.registrationForm.value).subscribe((data)=>{
      console.log(data);
      this.message=data});
    setTimeout(()=>{this.router.navigate(['/login']),1000});  
  }
  ngOnInit() {
  }

}
