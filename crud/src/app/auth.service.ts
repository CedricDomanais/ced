import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router:Router, private http: HttpClient) { }

  async signup(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
      console.log('User signed up');
      window.alert('User signed up');
      this.router.navigate(['/auth-signin']); // navigate to home page
    } catch (error:any) {
      console.error('Error during signup:', error);
      window.alert('Error during signup: ' + error.message);
    }
  }

  async signin(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('User signed in');
      window.alert('User signed in successfully'); // Add this line
    } catch (error) {
      console.error('Error during signin:', error);
    }
  }
  
  async signout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      console.log('User signed out');
    } catch (error) {
      console.error('Error during signout:', error);
    }
  }
  signOut() {
  // Clear user token and other related data
  localStorage.removeItem('userToken');
  // Navigate user back to login (or another public page)
  this.router.navigate(['/login']);
}
getUserId(): Promise<string> {
  return this.afAuth.currentUser.then(user => {
    if (user) {
      return user.uid;
    } else {
      throw new Error('User not logged in');
    }
  });
}

getUser(userId: string) {
  return this.http.get(`/users/${userId}`);
}
}