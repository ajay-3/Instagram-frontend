import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from  '@angular/http';
import { AppRoutingModule,RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SearchUserProfileComponent } from './search-user-profile/search-user-profile.component';
import { NouserComponent } from './nouser/nouser.component';
import { HomeComponent } from './home/home.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { DialogOverviewExampleDialogComponent } from './dialog-overview-example-dialog/dialog-overview-example-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    EditProfileComponent,
    SearchUserProfileComponent,
    NouserComponent,
    HomeComponent,
    NewsfeedComponent,
    DialogOverviewExampleDialogComponent,
  ],
  entryComponents:[
    DialogOverviewExampleDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
