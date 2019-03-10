import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/User';

@Pipe({
  name: 'defaultPipe'
})
export class DefaultPipePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return null;
  }
}

@Pipe({ name: 'userActivated' })
export class UserActivatedPipe implements PipeTransform {
  transform(value: any, ...args): any {
    if (!value) { return 'Desactivated'; }

    return 'Activated';
  }
}

@Pipe({ name: 'userFilter' })
export class UserFilterPipe implements PipeTransform {
  transform(users: User[], filterText: string): User[] {
    if(!users || !filterText) {
      return users;
    }
    return users.filter(user =>
      user.login.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
    );
  }
}

