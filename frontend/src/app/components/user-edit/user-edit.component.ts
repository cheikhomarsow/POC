import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/user.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrManager } from "ng6-toastr-notifications";

@Component({
  selector: "app-user-edit",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.css"]
})
export class UserEditComponent implements OnInit {
  user$;
  myForm: FormGroup;
  roleUser = false;
  roleAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrManager
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userService.getUserByLogin(params['login']).subscribe(
        (x: any) => {
          this.user$ = x;
        },
        error => console.log(error),
        () => {
          this.myForm = this.fb.group({
            login: this.user$.login,
            firstName: this.user$.firstName,
            lastName: this.user$.lastName,
            email: this.user$.email,
            roleUser: this.user$.authorities.includes('ROLE_USER'),
            roleAdmin: this.user$.authorities.includes('ROLE_ADMIN'),
          });
          this.cd.detectChanges();
        }
      );
    });

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
    this.user$.login = this.myForm.value.login;
    this.user$.firstName = this.myForm.value.firstName;
    this.user$.lastName = this.myForm.value.lastName;
    this.user$.email = this.myForm.value.email;
    this.user$.authorities = this.getSelectedAuthorities();
    this.userService.updateUser(this.user$).subscribe(
      res => {
        this.router.navigate(['/users']);
        this.showInfo();
      },
      err => {
        console.log(err);
       }
    );
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

  showInfo() {
    this.toastr.infoToastr('User updated successfuly.', 'Info');
  }
}
