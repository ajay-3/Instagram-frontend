import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {UserService} from "../user.service";
import {AuthService} from '../auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogOverviewExampleDialogComponent} from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images:Array<any>=[];
  constructor(private user:UserService,private auth:AuthService,private router:Router,public dialog: MatDialog) { 
  }

  ngOnInit() {
      this.user.getRandomPosts().subscribe((data)=>{
        var arr = Object.keys(data);
        for(let i=0;i<arr.length;i++){
          this.images.push(data[i]);
        }
      });
      this.openDialog();
  }
 
  openDialog(){
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      height: '200px',
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    });
   }
}
