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

  showSuccess() {
    this.toastr.successToastr("This is success toast.", "Success!");
  }

  onDelete(login) {
    if (this.isAdmin()) {
      this.userService.deleteUser(login);
      this.users = this.users.filter(u => u.login !== login);
      this.showSuccess();
    }
  }

  toggleActivated(user) {
    user.activated = !user.activated;
    this.userService.toggleActivated(user);
  }

  isAdmin() {
    const userLogged = this.userService.decodeUserToken();
    return userLogged.auth.includes("ROLE_ADMIN");
  }
}
