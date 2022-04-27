import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@app/material.module';
import { SwiperModule } from 'swiper/angular';
@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule, SwiperModule],
  exports: [MaterialModule, SwiperModule],
})
export class SharedModule {}
