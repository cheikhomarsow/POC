import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from '../../services/user.service';
import { UserActivatedPipe } from '../../pipes/default-pipe.pipe';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  // Set Dynamic Classes
  setClasses() {
    const classes = {
      user: true,
      'is-desactivated': !this.user.activated
    };

    return classes;
  }

  onToggle(user) {
    user.activated = !user.activated;
  }

  onDelete(login) {
    console.log(login);
    this.userService.deleteUser(login);
  }

  getUser(user) {
    console.log(user);
  }

  toggleActivated(user){
    user.activated = !user.activated;
    this.userService.toggleActivated(user);
  }

}
