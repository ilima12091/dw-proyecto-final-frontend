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
      const username = params['username'];
      this.getUserProfile(username);
    });
  }

  uploadProfileImage(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const file: File = files[0];
      const formData: FormData = new FormData();
      formData.append('profileImage', file);
  
      this.userService.uploadProfileImage(formData).then(response => {
        console.log('Profile image uploaded successfully', response);
        this.user.profileImage = response.filename;
      }).catch(error => {
        console.error('Error uploading profile image', error);
      });
    }
  }
  
  
  
  
  
  

  getUserProfile(username: string): void {
    this.userService.getUserByUserName(username)
      .then((user: User) => {
        this.user = user;
      })
      .catch(error => {
        console.error('Error retrieving user profile', error);
      });
  }
}
