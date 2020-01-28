import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './Auth/register/register.component';
import {LoginComponent} from './Auth/login/login.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {SearchUserProfileComponent} from './search-user-profile/search-user-profile.component';
import {NouserComponent} from './nouser/nouser.component';
import {HomeComponent} from './home/home.component';
import {NewsfeedComponent} from './newsfeed/newsfeed.component';
import { ImageViewComponent } from './image-view/image-view.component';
import { 
  AuthGuardService as AuthGuard 
} from './guards/auth-guard.service';



const routes: Routes = [
{path:"",component:HomeComponent},
{path:"register",component:RegisterComponent},
{path:"login",component:LoginComponent},
{path:"newsfeed",
component:NewsfeedComponent,
canActivate:[AuthGuard]
},
{ path:"profile",
  component:UserProfileComponent,
  canActivate:[AuthGuard]
  },
{path:"edit-profile",
component:EditProfileComponent,
canActivate:[AuthGuard]
},
{path:"profile/:userName",
 component:SearchUserProfileComponent,
 canActivate:[AuthGuard]},
 {path:"NotFound",
component:NouserComponent,
canActivate:[AuthGuard]
},{
  path:"postDetails",
  component: ImageViewComponent,
  canActivate:[AuthGuard]
}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponents = [HomeComponent,RegisterComponent,ImageViewComponent, LoginComponent,NewsfeedComponent,UserProfileComponent,EditProfileComponent,SearchUserProfileComponent,NouserComponent];