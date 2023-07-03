import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/users/users.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  username?: string;
  
  user_id: number | undefined;


  @Input() user!: User;
  @Input() setUserToEdit!: (user: User) => void;

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const user_id = params['user_id'];
      if (user_id !== undefined) {
        this.user_id = +user_id; 
        //this.getUserProfile(this.user_id);
      } else {
        console.error('User ID is undefined');
      }
    }, error => {
      console.error('Error retrieving route parameters', error);
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
    console.log('getUserProfile called with user_id:', user_id); // Debug statement
  
    this.userService.getUserByUserId(user_id)
      .then((user: User) => {
        console.log('Received user:', user); // Debug statement
  
        this.user = user;
      })
      .catch(error => {
        console.error('Error retrieving user profile', error);
      });

      
  }

  getUserProfileByUsername(username:string): void{
    console.log('getUserProfile called with username:', username); // Debug statement
  
    this.userService.getUserByUserName(username)
      .then((user: User) => {
        console.log('Received user:', user); // Debug statement
  
        this.user = user;
      })
      .catch(error => {
        console.error('Error retrieving user profile by username', error);
      });
    }

  
  
  

  saveChanges(){

    // to finish

    const nameInput = document.querySelector('input[name="Name"]') as HTMLInputElement;
    const surnameInput = document.querySelector('input[name="Surname"]') as HTMLInputElement;
    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
    const usernameInput = document.querySelector('input[name="username"]') as HTMLInputElement;

    const user: User = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password,
      username: this.username,
    };

    if (nameInput.value) {
      
      user.name= nameInput.value;
    }
  
    if (surnameInput.value) {
      
      user.surname = surnameInput.value;
      
    }
  
    if (emailInput.value) {
      user.email = emailInput.value;
      
    }
  
    if (usernameInput.value) {
      user.username = usernameInput.value;
    }
  }


}
