import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AuthService } from './auth.service';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
  { path: '', redirectTo: '/auth-signin', pathMatch: 'full' },
  { path: 'post-list', component: PostListComponent },
  { path: 'post-add', component: PostEditComponent },
  { path: 'auth-signin', component: AuthComponent },
  { path: 'auth-signup', component: AuthComponent },
  { path: 'post-edit/:index', component: PostEditComponent },
  { path: 'user-profile', component: UserProfileComponent }

]
const firebaseConfig = {
  apiKey: "AIzaSyDl-JrfIt9UFHFCZvdjrxBmymypU94zykg",
  authDomain: "crud-5b63b.firebaseapp.com",
  databaseURL: "https://crud-5b63b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "crud-5b63b",
  storageBucket: "crud-5b63b.appspot.com",
  messagingSenderId: "887408650840",
  appId: "1:887408650840:web:114f357b9fbab6d96cf82d",
  measurementId: "G-864NF6ZFJT"
};
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    PostComponent,
    PostListComponent,
    PostEditComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }