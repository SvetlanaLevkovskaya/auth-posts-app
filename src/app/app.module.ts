import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { UserService } from './auth/services/user.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [NgxSpinnerService, UserService, SocialAuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
