import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
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

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrManager
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      login: '',
      firstName: '',
      lastName: '',
      email: '',
      roleUser: this.roleUser,
      roleAdmin: this.roleAdmin
    });
  }

  submitHandler() {
    this.getSelectedAuthorities();
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
        console.log(err);
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
    return authorities;
  }
}
