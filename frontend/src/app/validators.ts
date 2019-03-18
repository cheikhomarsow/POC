import { AbstractControl, FormGroup } from "@angular/forms";
import { environment } from "../environments/environment";

export function loginValidator(control: AbstractControl) {
  if (control && (control.value !== null || control.value !== undefined)) {
    const cnfloginValue = control.value;
    if (cnfloginValue.length >= 4) {
      console.log("===========>");
      // const passValue = passControl.value;
      // if (passValue !== cnfpassValue || passValue === '') {
      //     return {
      //         isError: true
      //     };
      // }
    }
  }

  return true;
}
