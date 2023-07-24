import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '@annuadvent/ngx-cms/article';
import { ArticleEditorService } from '@annuadvent/ngx-cms/article-editor';
import { Category } from '@annuadvent/ngx-cms/category';
import { EditorElement, EditorElementData, Html2JsonService } from '@annuadvent/ngx-cms/content-editor';
import { MetaInfo } from '@annuadvent/ngx-common-ui/meta';
import { AppConfig, AppConfigService } from '@annuadvent/ngx-core/app-config';
import { UtilsService } from '@annuadvent/ngx-core/utils';
import { FIREBASE_AUTH_ROLES, FireAuthService } from '@annuadvent/ngx-tools/fire-auth';
import { FireArticlesHttpService, FireCategoriesHttpService } from '@annuadvent/ngx-tools/fire-cms';
import { FireStorageImageSpecs, FirebaseConfig } from '@annuadvent/ngx-tools/fire-common';
import { OPENAI_ID_PHRASES, OpenaiPrompt, OpenaiPromptTypeEnum, OpenaiService } from '@annuadvent/ngx-tools/openai';
import { Subscription } from 'rxjs';
import { DashboardMetaInfoEnum } from '../../enums/dashboard-meta.enums';
import { DashboardMetaService } from '../../services/dashboard-meta.service';

@Component({
  selector: 'app-manage-story-page',
  templateUrl: './manage-story-page.component.html',
  styleUrls: ['./manage-story-page.component.scss']
})
export class ManageStoryPageComponent {
  pageMeta: MetaInfo = null;
  article: Article | null = null;
  articleId: string = '';
  categories: Array<Category> = [];

  error: any = null;
  found: boolean = false;
  loading: boolean = true;
  paramsSubscription: Subscription;
  showUpdateConfirmationModal: boolean = false;
  ADD_ARTICLE: string = 'add';
  isAdmin: boolean = false;
  isAuthor: boolean = false;
  postfixUniqueId: boolean = true;
  showModal: boolean = false;
  imageHelpText: string = '';
  appConfig: AppConfig = null;

  //Open Ai
  openaiPrompts: Array<OpenaiPrompt> = [];
  showOpenAi: boolean = false;

  // Autogenerate Open Ai article
  showOpenAiAutogenerate: boolean = false;
  openaiPromptsToAutogenerate: Array<OpenaiPrompt> = [];
  autoGenerateLoading: boolean = false;

  autoGenerateTimer: any;
  autoGenerateStartTime: number = 0;
  autoGenerateExpectedTimeToFinish: number = 0;
  autoGenerateTimeEllapsed: number = 0;

  constructor(
    private fireArticlesHttpService: FireArticlesHttpService,
    private fireCategoriesHttpService: FireCategoriesHttpService,
    private fireAuthService: FireAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private utilsService: UtilsService,
    private dashboardMetaService: DashboardMetaService,
    private openaiService: OpenaiService,
    private html2jsonService: Html2JsonService,
    private articleEditorService: ArticleEditorService,
    private appConfigService: AppConfigService,
  ) {

    this.appConfig = this.appConfigService.config;

    const imageSpecs = (this.appConfigService.firebase as FirebaseConfig).storage.imageDimensions;
    this.imageHelpText = this.getImageSpecsString(imageSpecs);

    this.paramsSubscription = this.route.params.subscribe(async (params) => {
      this.error = null;
      this.found = true;
      this.articleId = params['storyId'];
      this.isAdmin = await this.fireAuthService.currentUserHasRole(
        FIREBASE_AUTH_ROLES.ADMIN
      );
      this.isAuthor = await this.fireAuthService.currentUserHasRole(
        FIREBASE_AUTH_ROLES.AUTHOR
      );
      this.getCategories();
      this.getArticle(this.articleId);
    });
  }


  private getImageSpecsString(imageSpecs: FireStorageImageSpecs): string {
    const { minWidth, minHeight, maxWidth, maxHeight, maxKBs } = imageSpecs;

    return `Allowed Image specification: 1Kb <= size <= ${maxKBs}Kbs | ${minWidth}px <= width <= ${maxWidth}px | ${minHeight}px <= height <= ${maxHeight}px`;
  }

  ngOnInit(): void {
    this.pageMeta = this.dashboardMetaService.setDashboardPageMeta(DashboardMetaInfoEnum.storyPage);
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  public get isNewArticlePage(): boolean {
    return this.articleId === this.ADD_ARTICLE;
  }

  public async getArticle(id: string) {
    this.error = null;
    this.loading = true;
    this.found = true;
    this.article = null;

    if (id !== this.ADD_ARTICLE) {
      const getArticlePromise: Promise<Article> = this.isAdmin
        ? this.fireArticlesHttpService.getArticle(id)
        : this.fireArticlesHttpService.getUsersArticle(
          this.fireAuthService.getCurrentUserId(),
          id
        );

      getArticlePromise
        .then((art: Article) => {
          if (art) {
            this.article = { ...art };
          } else {
            this.found = false;
            this.error = {
              code: '404',
              message: `Article does not exist - ${id}`,
            };
          }

          this.loading = false;
        })
        .catch((error) => {
          this.error = error;
          this.loading = false;
          this.found = false;
        });
    } else {
      this.found = true;
      this.loading = false;
      this.article = null;
    }
  }

  public async getCategories() {
    const pageCategories =
      await this.fireCategoriesHttpService.getAllUsersOnePageShallowCategories(
        this.isAdmin ? null : true
      );
    this.categories = pageCategories.categories || [];
  }

  public saveClicked(article: Article): void {
    this.article = { ...article };
    this.error = null;
    this.loading = true;

    // sets userid if not set already
    this.article.userId = this.article.userId || this.fireAuthService.getCurrentUserId();

    let savePromise;
    if (this.isNewArticlePage) {
      savePromise = this.fireArticlesHttpService.addArticle(this.article);
    } else {
      savePromise = this.fireArticlesHttpService.updateArticle(this.article);
    }

    savePromise
      .then((art: Article) => {
        this.article = { ...art };
        this.loading = false;
        if (this.isNewArticlePage) {
          this.router.navigate([this.article.id], {
            relativeTo: this.route.parent,
          });
        }
      })
      .catch((error) => {
        this.error = error;
        this.loading = false;
      });
  }

  public isLiveClicked(article: Article): void {
    this.article = { ...article };
    this.error = null;
    this.loading = true;
    if (!this.isNewArticlePage) {
      this.fireArticlesHttpService
        .setArticleLive(this.article)
        .then((art: Article) => {
          this.article = { ...art };
          this.loading = false;
        })
        .catch((error) => {
          this.error = error;
          this.loading = false;
        });
    } else {
      this.loading = false;
    }
  }

  public inReviewClicked(article: Article): void {
    this.article = { ...article };
    this.error = null;
    this.loading = true;
    if (!this.isNewArticlePage) {
      this.fireArticlesHttpService
        .setArticleUpForReview(this.article)
        .then((art: Article) => {
          this.article = { ...art };
          this.loading = false;
        })
        .catch((error) => {
          this.error = error;
          this.loading = false;
        });
    } else {
      this.loading = false;
    }
  }

  public deleteClicked(category: Category): void {
    this.showModal = true;
  }

  public deleteCancelled(): void {
    this.showModal = false;
  }

  public deleteConfirmed(): void {
    this.showModal = false;
    this.loading = true;
    this.error = null;
    this.fireArticlesHttpService
      .deleteArticle(this.article)
      .then((success) => {
        if (success === true) {
          this.router.navigate(['.'], { relativeTo: this.route.parent });
        } else {
          throw new Error('Something went wrong, please try again later.');
        }
        this.loading = false;
      })
      .catch((error) => {
        this.error = error;
        this.loading = false;
      });
  }

  public articleChanged(article: Article): void {
    article.metaInfo.site_name = this.appConfig.metaInfo.title;
    article.metaInfo['article:author'] =
      article.metaInfo['article:author'] ||
      this.appConfig.metaInfo['article:author'];
    article.metaInfo.author =
      article.metaInfo.author || this.appConfig.metaInfo.author;
  }

  public openAiClick(prompts: Array<OpenaiPrompt>): void {
    this.openaiPrompts = this.utilsService.deepCopy(prompts);
    this.getOpenaiPromptResults();
  }

  public async getOpenaiPromptResults(): Promise<void> {
    this.loading = true;

    // Reform the prompts as per new article/ existing article
    if (this.isNewArticlePage) {
      if (this.openaiPrompts.length === 1) {
        this.openaiPrompts[0].promptType = OpenaiPromptTypeEnum.content;
      } else {
        const currentPrompt = this.openaiPrompts[this.openaiPrompts.length - 1];
        if (
          [OpenaiPromptTypeEnum.keywords, OpenaiPromptTypeEnum.description].includes(
            currentPrompt.promptType
          )
        ) {
          this.openaiPrompts[this.openaiPrompts.length - 1].prompt =
            this.article.metaInfo.title;
        }
      }
    } else {
      const currentPrompt = this.openaiPrompts[this.openaiPrompts.length - 1];
      if (
        [OpenaiPromptTypeEnum.keywords, OpenaiPromptTypeEnum.description].includes(
          currentPrompt.promptType
        )
      ) {
        this.openaiPrompts[this.openaiPrompts.length - 1].prompt =
          this.article.metaInfo.title;
      }
    }

    let currentPrompt = this.openaiPrompts[this.openaiPrompts.length - 1];
    // fetch prompt results
    // prepend prompts with promptTypes, then make a call to openai api
    const mdStr = await this.openaiService.getChatResponse(
      this.openaiPrompts.map(
        (p) =>
          `${p.promptType ? p.promptType + ' "' : ''}${p.prompt}${p.promptType ? '"' : ''
          }`
      )
    );

    //Connverts to json
    const htmlStr = this.html2jsonService.md2html(mdStr);
    const jsonEl: EditorElement = this.html2jsonService.html2json(htmlStr);

    if (this.isNewArticlePage) {
      this.article = this.article || {};
      const metaInfo = (this.article.metaInfo = this.article.metaInfo || {});
    }

    if (currentPrompt.promptType === OpenaiPromptTypeEnum.description) {
      // For type description, fill/update only description.
      jsonEl.children.forEach((el) => {
        if (el.tagName.toLowerCase() === 'p') {
          this.article.metaInfo.description = el.data?.text;
        }
      });
    } else if (currentPrompt.promptType === OpenaiPromptTypeEnum.keywords) {
      // For keywrds type, fill only article keywords.
      const keyWords: Array<string> = [];
      jsonEl.children.forEach((el) => {
        if (['ul', 'ol'].includes(el.tagName.toLowerCase())) {
          el.children.forEach((liEl) => {
            if (liEl.tagName === 'li') {
              keyWords.push(liEl.data?.text);
            }
          });
        }
      });
      this.article.metaInfo.keywords = keyWords.join(', ');
    } else {
      if (this.isNewArticlePage) {
        // For the new article, set title and body for the first prompt only
        this.article.metaInfo.title = this.openaiPrompts[0].prompt;
        if (this.openaiPrompts.length === 1) {
          this.article.body = jsonEl;
        } else {
          // For new article, 2nd and onwards prompts append body children only.
          this.article.body.children = [].concat(
            this.article.body.children,
            [this.createHeadingFromPrompt(currentPrompt.prompt)],
            jsonEl.children
          );
        }
      } else {
        // For existing this.article, append body children only.
        this.article.body.children = [].concat(
          this.article.body.children,
          [this.createHeadingFromPrompt(currentPrompt.prompt)],
          jsonEl.children
        );
      }
    }

    // Updates article with openAi Info.
    this.article = { ...this.article };

    currentPrompt = {
      ...currentPrompt,
      message: {
        mdText: mdStr,
        htmlText: htmlStr,
        jsonText: JSON.stringify(jsonEl, null, '\t'),
      },
    };
    this.openaiPrompts[this.openaiPrompts.length - 1] = currentPrompt;
    this.openaiPrompts = [...this.openaiPrompts];

    this.loading = false;
    return;
  }

  private createHeadingFromPrompt(promptText: string): EditorElement {
    const editorEl: EditorElement = {
      name: `h2-${Date.now()}`,
      tagName: 'h2',
      isContainer: false,
      focused: false,
      data: { text: promptText } as EditorElementData,
    };

    return editorEl;
  }

  public openAiAutogenerateClick(prompts: Array<OpenaiPrompt>): void {
    this.openaiPromptsToAutogenerate = this.utilsService.deepCopy(prompts);
    const articleTitle =
      this.openaiPromptsToAutogenerate[
        this.openaiPromptsToAutogenerate.length - 1
      ]?.prompt;
    if (!articleTitle) throw new Error('Invalid article title');

    this.autoGenerateArticle(articleTitle);
  }

  public async autoGenerateArticle(articleTitle: string): Promise<Article> {
    const progressSubscription = this.articleEditorService.article.subscribe(
      (articleInProgress) => {
        this.article = articleInProgress;

        // calculates expected time to be taken, based on keywrds/ subtopics to search.
        const keywords = this.article?.metaInfo?.keywords || '';
        if (keywords) {
          this.autoGenerateExpectedTimeToFinish =
            60 + Math.ceil(keywords.split(', ').length / 3) * 60;
        }
      }
    );

    this.autoGenerateLoading = true;
    this.startAutoGenerateTimer();
    this.autoGenerateExpectedTimeToFinish = 60;

    const article = await this.articleEditorService.generateArticleFromOpenai(
      articleTitle,
      this.appConfig,
      '',
      '',
      ''
    );

    this.article = article;
    progressSubscription.unsubscribe();
    clearInterval(this.autoGenerateTimer);
    this.autoGenerateLoading = false;
    this.saveClicked(this.article);
    return article;
  }

  public startAutoGenerateTimer() {
    clearInterval(this.autoGenerateTimer);
    this.autoGenerateStartTime = Date.now();
    this.autoGenerateTimeEllapsed = 0;

    this.autoGenerateTimer = setInterval(() => {
      this.autoGenerateTimeEllapsed =
        (Date.now() - this.autoGenerateStartTime) / 1000;
    }, 1000);
  }

  public cleanAndFormatBody(): void {
    this.loading = true;
    setTimeout(() => {
      const body = this.articleEditorService.cleanAndFormatEditorEl(
        this.article.body,
        [...OPENAI_ID_PHRASES, 'As an AI language model']
      );

      this.article = { ...this.article, body };
      this.loading = false;
    });
  }
}
