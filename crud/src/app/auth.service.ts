import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router:Router) { }

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
}