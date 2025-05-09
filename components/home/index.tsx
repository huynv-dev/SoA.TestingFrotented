import type { PageData } from '@/types/api';
import type { Language } from '~/types/i18n';
import FeatureSection from './feature'
import HeroSection from './hero'
import CaseStudies from './case-study'
import AboutBasic from './about'
import ExploreSection from './expore'
import InteractiveMap from './interactive-map'
import GallerySection from './gallery';
import OurActivities from './our-activities/index';
import { getDictionary } from '~/lib/getTranslation';

interface HomePageProps {
  pageData: PageData;
  language: Language;
}

export default function HomePage({ pageData, language }: HomePageProps) {
  return (
    <>
      <HeroSection
        bannerTitles={pageData.banner_title}
        bannerMenu={pageData.banner_menu}
      />
      {/* Bloc 1 */}
      <FeatureSection
        title={pageData.bloc_1.title}
        subtitle={pageData.bloc_1.subtitle}
        cases={pageData.bloc_1.cases}
      />
      {/* Bloc 2 */}
      <InteractiveMap
        title={pageData.bloc_2.title}
        cases={pageData.bloc_2.cases} />
      {/* Bloc 2.2 */}
      <OurActivities
        title={pageData.bloc_2_2.title}
        btn_1={pageData.bloc_2_2.btn_1}
        btn_2={pageData.bloc_2_2.btn_2}
        btn_3={pageData.bloc_2_2.btn_3}
        btn_4={pageData.bloc_2_2.btn_4}
        btn_5={pageData.bloc_2_2.btn_5}
        btn_6={pageData.bloc_2_2.btn_6}
        language={language}
      />
      {/* Bloc 3 */}
      <CaseStudies
        title={pageData.bloc_3.title}
        moreInfo={pageData.bloc_3.more_info}
        cases={pageData.bloc_3.cases}
      />
      {/* Bloc 4 */}
      <AboutBasic
        title={pageData.bloc_4.title}
        subtitle={pageData.bloc_4.subtitle}
        textTitle={pageData.bloc_4.text_title}
        text={pageData.bloc_4.text}
        pictos={pageData.bloc_4.pictos}
      />
      <GallerySection
        title={pageData.bloc_5.title}
        text={pageData.bloc_5.text}
        reviews={pageData.bloc_5.reviews}
        footer={pageData.bloc_5.footer}
      />
      {/* Bloc 6 */}
      <ExploreSection
        title={pageData.bloc_6.title}
        subtitle={pageData.bloc_6.subtitle}
        text={pageData.bloc_6.text}
        buttonText={pageData.bloc_6.button}
      />
    </>
  )
}
