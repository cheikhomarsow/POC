import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/User';

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

@Pipe({ name: 'formatAuthorities' })
export class FormatAuthoritiesFilterPipe implements PipeTransform {
  transform(value: any, ...args): any {
    let res = 'User';
    if(value) {
      if(value.includes('ROLE_USER')){
        if(value.includes('ROLE_ADMIN')){
          res = res.concat(' & Admin');
        }
      }else{
        res = 'Admin';
      }
    }
    return res

  }
}

