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
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  pageMeta: MetaInfo = null;
  libsInfoArr: Array<LibInfo> = null;
  appDescription: string = '';

  constructor(
    private appStateService: AppStateService,
    private appMetaService: AppMetaService,
    private appConfigService: AppConfigService,
    private utilsService: UtilsService,
  ) {
    this.appStateService.appState.subscribe((appState: AppState) => {
      this.libsInfoArr = Object.values(appState[APP_STATE_KEYS.libsInfo] as LibsInfo || {});


      this.appDescription = this.appConfigService.config?.metaInfo?.description || '';
      this.appDescription = this.appDescription.replace(
        '{{libNames}}',
        this.utilsService.nauturalJoinArray(this.libsInfoArr.map(libInfo => libInfo.name)));


      this.pageMeta = this.appMetaService.setCorePageMeta(CoreMetaInfoEnum.contactUs, this.libsInfoArr.map(libInfo => libInfo.name));
    })
  }
}
