import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from "./base.service";
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: "root"
})
export class UserService extends BaseService{

  constructor(protected http: HttpClient) {
    super(http);
  }

  getUsers() {
    const url = `${environment.apiUrl}/users`;
    return this.getRequest(url);
  }

  getUserByLogin(login) {
    const url = `${environment.apiUrl}/users/${login}`;
    return this.getRequest(url);
  }

  createUser(params) {
    const url = `${environment.apiUrl}/users`;
    return this.postRequest(url, params);
  }

  deleteUser(login) {
    const url = `${environment.apiUrl}/users/${login}`;
    return this.deleteRequest(url);
  }

  toggleActivated(params){
    const url = `${environment.apiUrl}/users`;
    return this.putRequest(url, params);
  }
}
