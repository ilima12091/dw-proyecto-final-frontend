import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder,FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent implements OnInit {
  title = 'fileUpload';
  images?:any;
  constructor(private http: HttpClient){}

  ngOnInit(){

  }

  selectImage(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  async onSubmit() {
    const formData = new FormData();
    formData.append('file', this.images);

    try {
      const res = await this.http.post<any>('http://localhost:8000/user/upload', formData).toPromise();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

}