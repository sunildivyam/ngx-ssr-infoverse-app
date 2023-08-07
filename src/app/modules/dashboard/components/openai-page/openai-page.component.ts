import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { MetaInfo } from '@annuadvent/ngx-common-ui/meta';
import { Subscription, filter } from 'rxjs';
import { DashboardMetaInfoEnum } from '../../enums/dashboard-meta.enums';
import { DashboardMetaService } from '../../services/dashboard-meta.service';

@Component({
  selector: 'app-openai-page',
  templateUrl: './openai-page.component.html',
  styleUrls: ['./openai-page.component.scss']
})
export class OpenaiPageComponent {
  pageMeta: MetaInfo = null;
  loading: boolean = true;
  error: any;
  routeStartEvent: Subscription;
  routeEndEvent: Subscription;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private dashboardMetaService: DashboardMetaService,
  ) {

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
    this.pageMeta = this.dashboardMetaService.setDashboardPageMeta(DashboardMetaInfoEnum.openaiPage);
  }

  ngOnDestroy(): void {
    this.routeEndEvent.unsubscribe();
  }
}
