import { Injectable } from '@angular/core';
import { ToastrManager } from "ng6-toastr-notifications";

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor(private toastr: ToastrManager) { }

  showSuccess(message) {
    this.toastr.successToastr(message);
  }

  showError(message) {
    this.toastr.errorToastr(message);
  }

  showInfo(message) {
    this.toastr.infoToastr(message);
  }
}
