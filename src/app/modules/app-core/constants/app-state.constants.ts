import { AppStateKeys } from "../interfaces/app-state.interface";

export const APP_STATE_KEYS: AppStateKeys = {
    allLiveCategories: 'allLiveCategories',
    pageCategoryGroup: 'pageCategoryGroup',     // dynamic state
    pageCategoryGroups: 'pageCategoryGroups',
    articlesByFeatures: 'articlesByFeatures',
    article: 'article',                         // dynamic state
    // Dynamic stateNames have a name joined with '_'
};
