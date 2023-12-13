import { Component, OnInit } from '@angular/core';
import { BackEndService } from '../back-end.service';
import { AuthService } from '../auth.service'; // import AuthService
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  profileImage: string = 'https://via.placeholder.com/150';
  

  constructor(private backEndService: BackEndService, private authService: AuthService) { } // inject AuthService

  ngOnInit(): void {
  }

  onSave() {
    this.backEndService.saveData();
  }

  onFetch() {
    this.backEndService.fetchData();
  }

  signOut() {
    this.authService.signOut(); // call signOut() method from AuthService

  }
  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file: File = target.files[0];
  
      if (file) {
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          this.profileImage = e.target.result;
        };
  
        reader.readAsDataURL(file);
      }
    }
  }
}