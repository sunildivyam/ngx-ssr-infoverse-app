import { MetaInfo } from "@annuadvent/ngx-common-ui/meta";
import { CoreMetaInfo } from "../interfaces/app-core-meta.interface";
import { CoreMetaInfoEnum } from "../enums/app-core-meta.enums";

export const coreMetaInfo: CoreMetaInfo = {
    [CoreMetaInfoEnum.tnc]: {
        title: 'Terms and Conditions - {{companyName}}',
        description: 'Read and understand the Terms and Conditions (TNC) of {{companyName}}. This page outlines the rules, guidelines, and agreements governing the use of our Angular libraries, including {{libNames}}, as well as any associated Firebase functionality.',
        keywords: ' Terms and Conditions, TNC, Angular libraries, Firebase, guidelines, rules, agreements',
    } as MetaInfo,
    [CoreMetaInfoEnum.privacy]: {
        title: 'Privacy Policy - {{companyName}}',
        description: 'Review our Privacy Policy to understand how {{companyName}} handles and protects your personal information when using our Angular libraries, including {{libNames}}, along with any associated Firebase functionality.',
        keywords: 'Privacy Policy, personal information, data protection, Angular libraries',
    } as MetaInfo,
    [CoreMetaInfoEnum.aboutUs]: {
        title: 'About us - {{companyName}}',
        description: ' Learn more about {{companyName}} and our mission. Discover the team behind the development of the Angular libraries, including {{libNames}}, and how we aim to provide innovative solutions for developers using Firebase functionality.',
        keywords: ' About Us, mission, team, Angular libraries, Firebase, developers, solutions',
    } as MetaInfo,
    [CoreMetaInfoEnum.contactUs]: {
        title: 'Contact us - {{companyName}}',
        description: 'Get in touch with {{companyName}} using the contact information provided on this page. Reach out to us regarding inquiries, feedback, or support related to our Angular libraries, including {{libNames}}, and any Firebase functionality.',
        keywords: 'Contact Us, inquiries, feedback, support, Angular libraries, Firebase',
    } as MetaInfo,
}
