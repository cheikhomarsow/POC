import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from "@angular/forms";
import { loginValidator } from '../../validators';
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { ToastrManager } from "ng6-toastr-notifications";

@Component({
  selector: "app-user-post",
  templateUrl: "./user-post.component.html",
  styleUrls: ["./user-post.component.css"]
})
export class UserPostComponent implements OnInit {
  myForm: FormGroup;
  roleUser = false;
  roleAdmin = false;
  otherErrorMessages = {};

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrManager
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(4), loginValidator]],
      firstName: '',
      lastName: '',
      email: new FormControl('', [Validators.required, Validators.email]),
      roleUser: this.roleUser,
      roleAdmin: this.roleAdmin
    });
  }

  submitHandler() {
    const params = {
      login: this.myForm.value.login,
      firstName: this.myForm.value.firstName,
      lastName: this.myForm.value.lastName,
      email: this.myForm.value.email,
      authorities: this.getSelectedAuthorities()
    };
    this.userService.createUser(JSON.stringify(params)).subscribe(
      res => {
        this.router.navigate(['/users']);
        this.showSuccess();
      },
      err => {
        if (err.error && err.error.errorKey) {
          const error = err.error.errorKey;
          if (error === 'userexists') {
            this.otherErrorMessages['LoginExist'] = true;
          }
          if (error === 'emailexists') {
            this.otherErrorMessages['EmailExist'] = true;
          }
        }
      }
    );
  }

  showSuccess() {
    this.toastr.successToastr('User added successfully!', 'Success!');
  }

  getSelectedAuthorities() {
    const authorities = [];
    if (this.myForm.value.roleUser) {
      authorities.push('ROLE_USER');
    }
    if (this.myForm.value.roleAdmin) {
      authorities.push('ROLE_ADMIN');
    }

    // ROLE_USER by default
    if (authorities.length === 0) {
      authorities.push('ROLE_USER');
    }
    return authorities;
  }
}
