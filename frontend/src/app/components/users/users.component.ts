import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { ToastrManager } from "ng6-toastr-notifications";

import { User } from "../../models/User";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  users: User[];
  filterText: string;

  constructor(
    private userService: UserService,
    private toastr: ToastrManager
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  showSuccess(message) {
    this.toastr.successToastr(message, "Alert");
  }

  showError(message) {
    this.toastr.errorToastr(message, "Alert");
  }

  onDelete(login) {
    if (this.isAdmin()) {
      this.userService.deleteUser(login);
      this.users = this.users.filter(u => u.login !== login);
      this.showSuccess('User deleted successfuly!');
    }
  }

  toggleActivated(user) {
    user.activated = !user.activated;
    this.userService.toggleActivated(user).subscribe(
      res => {
        if (user.activated) {
          this.showSuccess('User activated successfuly!');
        } else {
          this.showError('User desactivated successfuly!');
        }
      },
      err => {
        console.log(err);
      }
    );
    return user.activated;
  }

  isAdmin() {
    const userLogged = this.userService.decodeUserToken();
    return userLogged.auth.includes("ROLE_ADMIN");
  }
}
