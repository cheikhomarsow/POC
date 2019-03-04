import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


@Injectable({
  providedIn: "root"
})
export class UserService {

  baseUrl = 'http://localhost:9090/api';
  token = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU1MTc0MzMxN30.dnzEs74jbDKHejXU8Q_bndkFzEgGdAb_Wg_iEqCHJul9he3bXuTdgrlieH_C1ZQZsWfHBZ_cmswRHuOslf4sWA`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    const url = `${this.baseUrl}/users`;

    return this.http.get<User[]>(url, {
      headers:
        new HttpHeaders()
          .append('Accept', 'application/json')
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + this.token)
      , responseType: 'json'
    })
    .pipe(
      map((response: Response) => <any>response)
    );
  }

  getUserByLogin(login) {
    const url = `${this.baseUrl}/users/${login}`;

    return this.http.get<User>(url, {
      headers:
        new HttpHeaders()
          .append('Accept', 'application/json')
          .append('Content-Type', 'application/json')
          .append('Authorization', 'Bearer ' + this.token)
      , responseType: 'json'
    })
    .pipe(
      map((response: Response) => <any>response)
    );
  }

  createUser(params) {
    console.log(params);
    const url = `${this.baseUrl}/users`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token });
    const options = { headers: headers };
    return this.http
      .post(url, params, options)
      .subscribe(
        res =>{
            console.log(res);
            this.redirect('/users');
        },
        err => {
            console.log(err.message);
        }
    );
  }

  redirect(pathname) {
    window.location.href = pathname;
  }
}
