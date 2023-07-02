import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user_id: number | undefined;


  @Input() user!: User;
  @Input() setUserToEdit!: (user: User) => void;

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const user_id = params['user_id'];
      if (user_id !== undefined) {
        this.user_id = +user_id; 
        this.getUserProfile(this.user_id);
      } else {
        console.error('User ID is undefined');
      }
    });
  }
  
  

  
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
  
  
  
  

  getUserProfile(user_id: number): void {
    this.userService.getUserByUserId(user_id)
      .then((user: User) => {
        this.user = user;
      })
      .catch(error => {
        console.error('Error retrieving user profile', error);
      });
  }
}
