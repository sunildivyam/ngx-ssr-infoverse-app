import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { ApiInterceptor, FireAuthModule, FirebaseInterceptor } from '@annuadvent/ngx-tools/fire-auth';
import { AppCoreModule, AppStateService, appInit } from './modules/app-core';
import { AppConfigModule, AppConfigService } from '@annuadvent/ngx-core/app-config';
import { UtilsModule } from '@annuadvent/ngx-core/utils';
import { FireCommonService } from '@annuadvent/ngx-tools/fire-common';
import { SpinnerModule } from '@annuadvent/ngx-common-ui/spinner';
import { ThemeModule } from '@annuadvent/ngx-common-ui/theme';
import { MenuModule } from '@annuadvent/ngx-common-ui/menu';
import { FooterNavModule } from '@annuadvent/ngx-common-ui/footer-nav';
import { ThemeFontResizerModule } from '@annuadvent/ngx-common-ui/theme-font-resizer';
import { BreadcrumbModule } from '@annuadvent/ngx-common-ui/breadcrumb';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AppCoreModule,
    SpinnerModule,
    ThemeModule,
    MenuModule,
    FooterNavModule,
    ThemeFontResizerModule,
    FireAuthModule,
    UtilsModule,
    AppConfigModule,
    BreadcrumbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FirebaseInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [
        AppStateService,
        AppConfigService,
        FireCommonService,
      ],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
