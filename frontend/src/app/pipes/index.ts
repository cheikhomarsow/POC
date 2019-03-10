import { NgModule } from '@angular/core';
import { UserActivatedPipe, UserFilterPipe } from './default-pipe.pipe';

export const PIPES = [
  UserActivatedPipe,
  UserFilterPipe
];

@NgModule({
  declarations: PIPES,
  exports: PIPES
})
export class PipesModule { }
