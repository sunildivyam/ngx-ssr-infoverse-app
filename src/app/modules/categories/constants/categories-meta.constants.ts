import { MetaInfo } from "@annuadvent/ngx-common-ui/meta";
import { CategoriesMetaInfoEnum } from "../enums/categories-meta.enums";
import { CategoriesMetaInfo } from "../interfaces/categories-meta.interface";

export const categoriesMetaInfo: CategoriesMetaInfo = {

    [CategoriesMetaInfoEnum.categoriesHomePage]: {
        title: 'Explore Stories, News, Quizes and more - {{companyName}}',
        description: `Explore a realm of captivating genres on {{companyName}} App's Genre Page. Immerse yourself in a collection of latest, featured, and prime stories tailored to your tastes. From technology, business, education, research, romance, health to thrilling mysteries, find the perfect narrative that ignites your passion. Navigate to other genres or discover diverse experiences on the Other Categories page. Begin your literary odyssey now!`,
        keywords: 'Captivating Genres, Genre Page, Latest Stories, Featured Tales, Prime Narratives, Technoloy, Science,  Business, Research, Education, Stock Markets, Finnance, News, Heartwarming Romance, Thrilling Mysteries, Tailored Tastes, Literary Odyssey, Narrative Collection, Annu Advent App, Explore Genres, Other Categories, Genre Links, Diverse Experiences, Passionate Reads, Immerse Yourself',
    } as MetaInfo,
}
