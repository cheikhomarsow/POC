import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userLogin: string;
  user$;

  constructor(private route: ActivatedRoute, private userService: UserService, private cd: ChangeDetectorRef,
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userLogin = params['login'];
    });

    this.userService.getUserByLogin(this.userLogin).subscribe(
      (user: any) => {
        this.user$ = user ? user : null;
      },
      error => console.log(error),
      () => {
        this.cd.detectChanges();
      }
    );
  }

}
