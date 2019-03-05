import { Component } from "@angular/core";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-components/app-nav",
  templateUrl: "./app-nav.component.html",
  styleUrls: ["./app-nav.component.css"]
})
export class AppNavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService, private router: Router) {}

  isLoggedIn() {
    return !!localStorage.getItem('JWT_TOKEN')
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
