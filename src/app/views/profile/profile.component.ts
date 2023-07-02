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
  @Input() user!: User;
  @Input() setUserToEdit!: (user: User) => void;

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const user_id = params['user_id'];
      this.getUserProfile(user_id);
    });
  }

  /*
  uploadProfileImage(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const file: File = files[0];
      const formData: FormData = new FormData();
      formData.append('file', file);
  
      const user_id = this.user.user_id || '';
  
      this.userService.uploadProfileImage(formData, user_id).then(response => {
        console.log('Profile image uploaded successfully', response);
        // Update the user object with the new profileImage value
        this.user.profileImage = response.profileImage;
  
        // Fetch the updated user object from the backend
        this.userService.getUserByUserId(user_id).then((user: User) => {
          this.user = user;
        }).catch(error => {
          console.error('Error retrieving user profile', error);
        });
      }).catch(error => {
        console.error('Error uploading profile image', error);
      });
    }
  }*/ 

  uploadProfileImage(event: Event): any{

  };
  

  getUserProfile(user_id: string): void {
    this.userService.getUserByUserId(user_id)
      .then((user: User) => {
        this.user = user;
      })
      .catch(error => {
        console.error('Error retrieving user profile', error);
      });
  }
}
