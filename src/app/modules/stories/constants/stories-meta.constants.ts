import { MetaInfo } from "@annuadvent/ngx-common-ui/meta";
import { StoriesMetaInfoEnum } from "../enums/stories-meta.enums";
import { StoriesMetaInfo } from "../interfaces/stories-meta.interface";

export const storiesMetaInfo: StoriesMetaInfo = {

    [StoriesMetaInfoEnum.storiesHomePage]: {
        title: 'Explore Stories, News, Quizes and more - {{companyName}}',
        description: `Immerse yourself in a world of captivating stories on {{companyName}}'s Genres page. Discover the latest, featured, and prime narratives across various genres. Explore tales that spark your imagination and intellect. Navigate to our Genres page for specialized collections or check out Other Stories for diverse reading experiences.`,
        keywords: 'Captivating Stories, Latest Narratives, Featured Tales, News, Prime Storytelling, Genres Page, Explore Stories, Imagination, Reading Experiences, Adventure, Intellect, Narrative Collection, Story Exploration, Annu Advent App, Story Links, Navigate to Genres, Diverse Tales',
    } as MetaInfo,
}
