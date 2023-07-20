import { Component } from '@angular/core';
import { MetaInfo } from '@annuadvent/ngx-common-ui/meta';
import { AppStateService } from '../../services/app-state.service';
import { AppConfigService } from '@annuadvent/ngx-core/app-config';
import { AppMetaService } from '../../services/app-meta.service';

@Component({
  selector: 'app-app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.scss']
})
export class AppHomeComponent {

  companyName: string = '';
  pageMeta: MetaInfo = null;

  constructor(
    private appStateService: AppStateService,
    private appConfigService: AppConfigService,
    private appMetaService: AppMetaService,
  ) {
    this.companyName = this.appConfigService.config?.metaInfo?.title || '';
  }
}
