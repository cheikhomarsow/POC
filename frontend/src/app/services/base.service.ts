import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

export class BaseService {
  token = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU1MTc0MzMxN30.dnzEs74jbDKHejXU8Q_bndkFzEgGdAb_Wg_iEqCHJul9he3bXuTdgrlieH_C1ZQZsWfHBZ_cmswRHuOslf4sWA`;
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
