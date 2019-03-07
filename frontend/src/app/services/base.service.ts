import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

export class BaseService {

  token = localStorage.getItem('JWT_TOKEN');
  constructor(protected http: HttpClient) {}

  getRequest(url) {
    return this.http
      .get<any>(url, {
        headers: new HttpHeaders()
          .append("Accept", "application/json")
          .append("Content-Type", "application/json")
          .append("Authorization", "Bearer " + this.token),
        responseType: "json"
      })
      .pipe(map((response: Response) => <any>response));
  }

  postRequest(url, params) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token });
    const options = { headers: headers };
    return this.http.post(url, params, options).subscribe(
      res => {
        console.log(res);
        this.redirect('/users');
      },
      err => {
        console.log(err.message);
      }
    );
  }

  deleteRequest(url) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token });
    const options = { headers: headers };
    return this.http.delete(url, options).subscribe(
      res => {
        //this.redirect('/users');
      },
      err => {
        console.log(err.message);
      }
    );
  }

  putRequest(url, params) {
    console.log(params);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token });
    const options = { headers: headers };
    return this.http
      .put(url, params, options).subscribe(
        res => {
          // this.redirect('/users');
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
