import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  username?: string;

  constructor(private userService: UserService) { }

  signUp(): void {

    const user : User = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password,
      username: this.username
    };

    this.userService.createUser(user).then(response => {
        
        console.log('User created successfully', response);
      })
      .catch(error => {
        console.error('Error creating user', error);
        
      });
  }
}
