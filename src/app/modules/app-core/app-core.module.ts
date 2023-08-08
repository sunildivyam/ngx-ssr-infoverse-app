import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';

import { CardModule } from '@annuadvent/ngx-common-ui/card';
import { ErrorModule } from '@annuadvent/ngx-common-ui/error';
import { FireAuthModule } from '@annuadvent/ngx-tools/fire-auth';
import { ModalModule } from '@annuadvent/ngx-common-ui/modal';
import { FireStorageModule } from '@annuadvent/ngx-tools/fire-storage';
import { SpinnerModule } from '@annuadvent/ngx-common-ui/spinner';
import { UtilsModule } from '@annuadvent/ngx-core/utils';
import { FireCommonModule } from '@annuadvent/ngx-tools/fire-common';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { AppHomeComponent } from './components/app-home/app-home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { RouterModule } from '@angular/router';
import { ArticleModule } from '@annuadvent/ngx-cms/article';
import { ArticlesSlideshowModule } from '@annuadvent/ngx-cms/articles-slideshow';
import { SocialMediaModule } from '@annuadvent/ngx-common-ui/social-media';


@NgModule({
  declarations: [
    LoginComponent,
    ContactUsComponent,
    AboutUsComponent,
    TermsAndConditionsComponent,
    PrivacyComponent,
    AppHomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ErrorModule,
    FireAuthModule,
    SpinnerModule,
    ModalModule,
    FireStorageModule,
    UtilsModule,
    FireCommonModule,
    ArticleModule,
    ArticlesSlideshowModule,
    SocialMediaModule,
  ],
  exports: [
    LoginComponent,
    ContactUsComponent,
    AboutUsComponent,
    TermsAndConditionsComponent,
    PrivacyComponent,
    AppHomeComponent,
  ],
})
export class AppCoreModule { }
