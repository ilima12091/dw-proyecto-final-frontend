import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  userId: string | null;
  isCurrentUserProfile = false;
  user!: User;
  isLoading = false;
  errorSaving = false;
  successSaving = false;
  profileDataForm = new FormGroup({
    username: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private usersService: UserService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.userId = localStorage.getItem('USERID');
    this.isCurrentUserProfile = id === this.userId;

    this.isLoading = true;
    this.usersService
      .getUserData(parseInt(this.userId ?? '0'))
      .then((data) => {
        this.user = data;
        this.profileDataForm.setValue({
          username: data.username,
          name: data.name,
          surname: data.surname,
        });
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  updateData() {
    const { username, name, surname } = this.profileDataForm.value;

    this.usersService
      .updateUser(parseInt(this.userId ?? '0'), {
        username,
        name,
        surname,
      })
      .then(() => {
        this.showSuccessSaving();
      })
      .catch(() => {
        this.showErrorSaving();
      });
  }

  showErrorSaving() {
    this.errorSaving = true;
    setTimeout(() => {
      this.errorSaving = false;
    }, 3000);
  }

  showSuccessSaving() {
    this.successSaving = true;
    setTimeout(() => {
      this.successSaving = false;
    }, 3000);
  }
}
