import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css']
})
export class UserPostComponent implements OnInit {

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      login: '',
      firstName: '',
      lastName: '',
      email: ''
    });
  }

  submitHandler(){
    const params = {
      'login': this.myForm.value.login,
      'firstName': this.myForm.value.firstName,
      'lastName': this.myForm.value.lastName,
      'email': this.myForm.value.email
    };
    this.userService.createUser(JSON.stringify(params));
  }

}
