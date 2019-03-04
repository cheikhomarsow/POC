import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BaseService } from "./base.service";


@Injectable({
  providedIn: "root"
})
export class UserService extends BaseService{

  baseUrl = 'http://localhost:9090/api';

  constructor(protected http: HttpClient) {
    super(http);
  }

  getUsers() {
    const url = `${this.baseUrl}/users`;
    return this.getRequest(url);
  }

  getUserByLogin(login) {
    const url = `${this.baseUrl}/users/${login}`;
    return this.getRequest(url);
  }

  createUser(params) {
    const url = `${this.baseUrl}/users`;
    return this.postRequest(url, params);
  }

  deleteUser(login) {
    const url = `${this.baseUrl}/users/${login}`;
    return this.deleteRequest(url);
  }
}
