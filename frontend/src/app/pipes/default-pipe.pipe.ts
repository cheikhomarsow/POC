import { Pipe, PipeTransform } from '@angular/core';

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
