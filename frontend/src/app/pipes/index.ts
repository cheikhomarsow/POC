import { NgModule } from '@angular/core';
import { UserActivatedPipe, UserFilterPipe, FormatAuthoritiesFilterPipe } from './default-pipe.pipe';

export const PIPES = [
  UserActivatedPipe,
  UserFilterPipe,
  FormatAuthoritiesFilterPipe
];

@NgModule({
  declarations: PIPES,
  exports: PIPES
})
export class PipesModule { }
