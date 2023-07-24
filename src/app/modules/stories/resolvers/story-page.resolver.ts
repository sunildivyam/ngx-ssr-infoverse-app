import { APP_STATE_KEYS, AppState, AppStateService } from '../../app-core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StoryPageResolver {
  constructor(
    private AppStateService: AppStateService,
  ) { }

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<AppState> {

    const articleId = route.params['articleId'];

    // Dynamic stateName as this page's state depends upon articleId
    const stateName = this.AppStateService.getDynamicStateName([APP_STATE_KEYS.article, articleId]);

    const newAppState: AppState = await this.AppStateService.setState(stateName, {
      articleId
    })
      .catch(err => {
        console.error(err);
        return null;
      });

    return newAppState && newAppState[stateName] || null;
  }
}
