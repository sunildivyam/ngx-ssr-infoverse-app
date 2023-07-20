import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MetaInfo, MetaService } from '@annuadvent/ngx-common-ui/meta';
import { AppConfigService } from '@annuadvent/ngx-core/app-config';
import { UtilsService } from '@annuadvent/ngx-core/utils';
import { coreMetaInfo } from '../constants/app-core-meta.constants';
import { CoreMetaInfoEnum } from '../enums/app-core-meta.enums';

@Injectable({
  providedIn: 'root'
})
export class AppMetaService {

  constructor(
    private metaService: MetaService,
    private appConfigService: AppConfigService,
    private utilsService: UtilsService,
    private router: Router,
  ) { }


  public setPageMeta(title: string = '', description: string = '', keywords: Array<string> = []): MetaInfo {
    const appMetaInfo: MetaInfo = { ...this.appConfigService.config.metaInfo };

    const pageMeta = {
      ...appMetaInfo,
      title: title || appMetaInfo.title,
      description: description || appMetaInfo.description,
      keywords: keywords?.length ? keywords.join(', ') : appMetaInfo.keywords,
      "article:tag": keywords?.length ? keywords.join(', ') : appMetaInfo.keywords,
      "article:published_time": this.utilsService.currentDate,
      url: this.router.url,
    }

    this.metaService.setPageMeta(pageMeta);

    return pageMeta;
  }

  public setCorePageMeta(pageName: CoreMetaInfoEnum, libNames: Array<string>): MetaInfo {
    let { title, description, keywords } = coreMetaInfo[pageName];
    const companyName = this.appConfigService.config.name;

    title = title.replace('{{companyName}}', companyName);
    description = description.replace('{{companyName}}', companyName);
    description = description.replace('{{libNames}}', this.utilsService.nauturalJoinArray(libNames));
    const keywordsArr: Array<string> = [
      ...keywords.split(', '),
      companyName,
      ...libNames
    ];

    return this.setPageMeta(title, description, keywordsArr);
  }

  public setHomePageMeta(libNames: Array<string>): MetaInfo {
    let { title, description, keywords } = this.appConfigService.config.metaInfo;
    const companyName = this.appConfigService.config.name;

    title = title.replace('{{companyName}}', companyName);
    description = description.replace('{{companyName}}', companyName);
    description = description.replace('{{libNames}}', this.utilsService.nauturalJoinArray(libNames));
    const keywordsArr: Array<string> = [
      ...keywords.split(', '),
      companyName,
      ...libNames
    ];

    return this.setPageMeta(title, description, keywordsArr);
  }
}
