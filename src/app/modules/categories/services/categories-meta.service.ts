import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MetaInfo, MetaService } from '@annuadvent/ngx-common-ui/meta';
import { AppConfigService } from '@annuadvent/ngx-core/app-config';
import { UtilsService } from '@annuadvent/ngx-core/utils';
import { CategoriesMetaInfoEnum } from '../enums/categories-meta.enums';
import { categoriesMetaInfo } from '../constants/categories-meta.constants';

@Injectable({
  providedIn: 'root'
})
export class CategoriesMetaService {

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

  public setCategoriesPageMeta(pageName: CategoriesMetaInfoEnum): MetaInfo {
    let { title, description, keywords } = categoriesMetaInfo[pageName];
    const companyName = this.appConfigService.config.name;

    title = title.replace('{{companyName}}', companyName);
    description = description.replace('{{companyName}}', companyName);
    const keywordsArr: Array<string> = [
      ...keywords.split(', '),
      companyName
    ];

    return this.setPageMeta(title, description, keywordsArr);
  }
}
