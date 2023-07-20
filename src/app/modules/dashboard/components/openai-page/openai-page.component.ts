import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { MetaService } from '@annuadvent/ngx-common-ui/meta';
import { AppConfig, AppConfigService } from '@annuadvent/ngx-core/app-config';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-openai-page',
  templateUrl: './openai-page.component.html',
  styleUrls: ['./openai-page.component.scss']
})
export class OpenaiPageComponent {
  loading: boolean = true;
  error: any;
  routeStartEvent: Subscription;
  routeEndEvent: Subscription;
  appConfig: AppConfig = null;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private metaService: MetaService,
    private appConfigService: AppConfigService,
  ) {
    this.appConfig = this.appConfigService.config;

    this.routeStartEvent = this.router.events
      .pipe(filter((ev) => ev instanceof NavigationStart))
      .subscribe(() => {
        this.loading = true;
        this.error = null;
      });

    this.routeEndEvent = this.router.events
      .pipe(filter((ev) => ev instanceof NavigationEnd))
      .subscribe(() => {
        this.loading = false;
      });
  }

  ngOnInit(): void {
    // this.metaService.setPageMeta({
    //   ...openaiArticlesMetaInfo,
    //   title: `${appConfig.metaInfo.title} - ${openaiArticlesMetaInfo.title}`,
    // });
  }

  ngOnDestroy(): void {
    this.routeEndEvent.unsubscribe();
  }
}
