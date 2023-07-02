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
export class ProfilePictureComponent implements OnInit {
  title = 'fileUpload';
  images?: any;
  @Input() user!: User;
  @Input() setUserToEdit!: (user: User) => void;

  private apiUrl = 'http://localhost:8000/user/upload/:username'; 

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const username = params['username'];
      this.getUserProfile(username);
    });
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

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  async onSubmit() {
    const formData = new FormData();
    formData.append('file', this.images);
  
    try {
      const res = await this.http.post<any>(`http://localhost:8000/user/upload/${this.user.username}`, formData).toPromise();
      console.log(res); // The response will contain the updated user object
  
      if (res && res.user) {
        this.user = res.user; // Assign the updated user object to this.user
      }
    } catch (err) {
      console.log(err);
    }
  }
  
}
