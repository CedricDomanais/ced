import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup = this.formBuilder.group({});
  isSignInMode = true; // Add this line

  constructor(private afAuth: AngularFireAuth, private formBuilder: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  switchMode() { // Add this method
    this.isSignInMode = !this.isSignInMode;
  }

  async signup(): Promise<void> {
    const { email, password } = this.authForm.value;
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
      console.log('User signed up');
      window.alert('User signed up');
    } catch (error) {
      console.error('Error during signup:', error);
    }
  }

  async signin(): Promise<void> {
    const { email, password } = this.authForm.value;
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('User signed in');
      this.router.navigate(['/post-list']); // navigate to post-list page
    } catch (error: any) {
      console.error('Error during signin:', error);
    }
  }
   
  signOut() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/auth-signin']);
    });
  }
}

