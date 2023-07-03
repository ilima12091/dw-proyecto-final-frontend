import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/users/users.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent {
  title = 'fileUpload';
  images?: any;
  user_id?:number;
  @Input() user!: User;
  @Input() setUserToEdit!: (user: User) => void;

  private apiUrl = 'http://localhost:8000/user/upload/:username'; 

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  
  uploadProfileImage(event: any): void {
    const file = event.target.files[0]; // Selected file
  
    const reader = new FileReader();
  
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        let fileData: string | undefined;
  
        if (typeof e.target.result === 'string') {
          // Handle the case when e.target.result is a string
          fileData = e.target.result.split(',')[1]; // Extract the Base64 data from the Data URL
        } else if (e.target.result instanceof ArrayBuffer) {
        const binary = Array.from(new Uint8Array(e.target.result));
        const base64 = btoa(binary.map(byte => String.fromCharCode(byte)).join(''));
        fileData = base64;
        }
  
        if (fileData) {
          
          // Send the fileData to the server
          this.userService.uploadProfileImage(fileData, this.user_id)
            .then(response => {
              console.log('Image uploaded:', response);
            })
            .catch(error => {
              console.error('Error uploading file:', error);
            });
        }
      }
    };
  
    reader.readAsDataURL(file);
  }
  
}
