import { Component } from '@angular/core';
import { MetaInfo } from '@annuadvent/ngx-common-ui/meta';
import { AppStateService } from '../../services/app-state.service';
import { AppState } from '../../interfaces/app-state.interface';
import { AppMetaService } from '../../services/app-meta.service';
import { CoreMetaInfoEnum } from '../../enums/app-core-meta.enums';
import { APP_STATE_KEYS } from '../../constants/app-state.constants';
import { LibInfo, LibsInfo } from '@annuadvent/ngx-lib-docs/docs-common';
import { AppConfigService } from '@annuadvent/ngx-core/app-config';
import { UtilsService } from '@annuadvent/ngx-core/utils';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent {
  pageMeta: MetaInfo = null;
  libsInfoArr: Array<LibInfo> = null;
  appDescription: string = '';
  companyName: string = '';
  siteEmail: string = '';
  naturalLibNames: string = '';

  constructor(
    private appStateService: AppStateService,
    private appMetaService: AppMetaService,
    private appConfigService: AppConfigService,
    private utilsService: UtilsService,
  ) {
    this.companyName = this.appConfigService.config?.name || '';
    this.siteEmail = this.appConfigService.config?.siteEmail || '';

    this.appStateService.appState.subscribe((appState: AppState) => {
      this.libsInfoArr = Object.values(appState[APP_STATE_KEYS.libsInfo] as LibsInfo || {});

      this.naturalLibNames = this.utilsService.nauturalJoinArray(this.libsInfoArr.map(libInfo => libInfo.name));

      this.appDescription = this.appConfigService.config?.metaInfo?.description || '';
      this.appDescription = this.appDescription.replace(
        '{{libNames}}',
        this.utilsService.nauturalJoinArray(this.libsInfoArr.map(libInfo => libInfo.name)));


      this.pageMeta = this.appMetaService.setCorePageMeta(CoreMetaInfoEnum.tnc, this.libsInfoArr.map(libInfo => libInfo.name));
    })
  }
}
