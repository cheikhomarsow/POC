import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { User } from "../../models/User";
import { DialogService } from "../../services/dialog.service";
import { ToastrService } from '../../services/toastr.service';

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
    private dialogService: DialogService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users.filter(user =>
        user.login !== this.userService.decodeUserToken().sub
      );
    });
  }

  onDelete(login) {
    if (this.isAdmin()) {
      this.dialogService.openConfirmDialog('Are you sure to detele this user ?')
      .afterClosed().subscribe(res => {
        console.log(res);
        if (res) {
          this.userService.deleteUser(login).subscribe(data => {
            this.users = this.users.filter(u => u.login !== login);
            this.toastrService.showSuccess('User deleted successfuly!');
          });
        }
      });
    }
  }

  toggleActivated(user) {
    user.activated = !user.activated;
    this.userService.toggleActivated(user).subscribe(
      res => {
        if (user.activated) {
          this.toastrService.showSuccess('User activated successfuly!');
        } else {
          this.toastrService.showError('User desactivated successfuly!');
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
