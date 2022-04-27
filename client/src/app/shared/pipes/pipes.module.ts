// angular
import { NgModule } from '@angular/core';
import { PostTimePipe } from './post-time.pipe';
import { BackgroundUrl } from './background-url.pipe';
@NgModule({
  declarations: [PostTimePipe, BackgroundUrl],
  exports: [PostTimePipe, BackgroundUrl],
})
export class PipesModule {}
