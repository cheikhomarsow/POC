import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

export class BaseService {

  token = localStorage.getItem('JWT_TOKEN');
  constructor(protected http: HttpClient) {}

  getRequest(url) {
    return this.http
      .get<any>(url)
      .pipe(map((response: Response) => <any>response));
  }

  postRequest(url, params) {
    return this.http.post(url, params);
  }

  deleteRequest(url) {
    return this.http.delete(url);
  }

  putRequest(url, params) {
    return this.http
      .put(url, params);
  }

  redirect(pathname) {
    window.location.href = pathname;
  }
}
