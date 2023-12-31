import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NotifyComponent } from './components/notify/notify.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [NotifyComponent, HeaderComponent, PageNotFoundComponent],
  imports: [CommonModule, RouterLink, RouterLinkActive, NgOptimizedImage],
  exports: [NotifyComponent, HeaderComponent, PageNotFoundComponent],
  providers: [],
})
export class SharedModule {}
