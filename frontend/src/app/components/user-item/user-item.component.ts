import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

  // Set Dynamic Classes
  setClasses() {
    const classes = {
      user: true,
      //'is-completed': this.user.activated
    };

    return classes;
  }

  onToggle(user) {
    user.activated = !user.activated;
  }

  onDelete(user) {
    console.log('delete');
  }

  getUser(user) {
    console.log(user);
  }

}
