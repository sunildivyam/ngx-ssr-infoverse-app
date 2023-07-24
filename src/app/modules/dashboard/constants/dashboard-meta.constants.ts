import { MetaInfo } from "@annuadvent/ngx-common-ui/meta";
import { DashboardMetaInfoEnum } from "../enums/dashboard-meta.enums";
import { DashboardMetaInfo } from "../interfaces/dashboard-meta.interface";

export const dashboardMetaInfo: DashboardMetaInfo = {

    [DashboardMetaInfoEnum.dashboardPage]: {
        title: 'Dashboard - {{companyName}}',
        description: 'Manage your profile, stories, genres, quizes and more.',
        keywords: 'Dashboard, add story, update story, write story, add quiz, update quiz, write quiz',
    } as MetaInfo,

    [DashboardMetaInfoEnum.storiesHomePage]: {
        title: 'Manage Stories Dashboard - {{companyName}}',
        description: 'Manage your stories, add, update and publish',
        keywords: 'Dashboard, add story, update story, write story',
    } as MetaInfo,

    [DashboardMetaInfoEnum.categoriesPage]: {
        title: 'Manage Genres Dashboard - {{companyName}}',
        description: 'Manage your Genres, add, update and publish',
        keywords: 'Dashboard, add genre, update genre, write genre',
    } as MetaInfo,

    [DashboardMetaInfoEnum.storyPage]: {
        title: 'Manage Story Dashboard - {{companyName}}',
        description: 'Manage your Story, add, update and publish',
        keywords: 'Dashboard, add story, update story, write story',
    } as MetaInfo,

    [DashboardMetaInfoEnum.categoryPage]: {
        title: 'Manage Genre Dashboard - {{companyName}}',
        description: 'Manage your Genre, add, update and publish',
        keywords: 'Dashboard, add genre, update genre, write genre',
    } as MetaInfo,


    [DashboardMetaInfoEnum.openaiPage]: {
        title: 'Openai Dashboard - {{companyName}}',
        description: 'Openai dashboard - generate content, images, stories, quizes and more with artificial intelligence',
        keywords: 'Openai Dashboard, ai, artificial intelligence',
    } as MetaInfo,

    [DashboardMetaInfoEnum.sitemapPage]: {
        title: 'Sitemap Dashboard - {{companyName}}',
        description: 'Sitemap dashboard - generate content, images, stories, quizes and more with artificial intelligence',
        keywords: 'Sitemap Dashboard, generate sitemap, update sitemap, xml, sitemap.xml',
    } as MetaInfo,

}
