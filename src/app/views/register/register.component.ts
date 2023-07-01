import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
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

  constructor(private userService: UserService, private router: Router) { }
  
  formSubmitted: boolean = false;

  signUp(): void {

    const user : User = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password,
      username: this.username
    };

    this.userService.createUser(user)
    .then(response => {
        
      this.formSubmitted = true;
        console.log('User created successfully', response);
        if(response){
          this.router.navigate(['/login']);
        }
      })
      .catch(error => {
        console.error('Error creating user', error);
        
      });
  }

  isFieldMissing(fieldName: string): boolean {
    if (this.formSubmitted) {
      const fieldValue = this[fieldName];
      return !fieldValue;
    }
    return false;
  }
  [key: string]: any;
}
