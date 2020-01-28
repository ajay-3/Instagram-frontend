import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient ,HttpHeaders} from '@angular/common/http';

interface validity{
  message:string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  valid ="false";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
 
  registerUser(data):Observable<validity>{
    return this.http.post<validity>("http://localhost:3000/api/register",data,this.httpOptions);
  }

  loginUser(data:Object){
    return this.http.post("http://localhost:3000/api/login",data,this.httpOptions);
  }
  
  validity(data){
    this.valid = data;
  }

  isAuthenticated(): boolean {
    if(this.valid == "true"){
      return true;
    }
    else{
    return false;}
  }

  
  constructor(private http:HttpClient) { }
}
