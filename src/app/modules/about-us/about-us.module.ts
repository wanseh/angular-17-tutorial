import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  declarations: [AboutUsComponent], // Components that are declared in this module can accessed these imports
  imports: [CommonModule, AboutUsRoutingModule],
  exports: [],
  providers: [],
})
export class AboutUsModule {}
