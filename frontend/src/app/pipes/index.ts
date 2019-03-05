import { NgModule } from '@angular/core';
import { UserActivatedPipe } from './default-pipe.pipe';

export const PIPES = [
  UserActivatedPipe
];

@NgModule({
  declarations: PIPES,
  exports: PIPES
})
export class PipesModule { }
