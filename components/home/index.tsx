import type { PageData } from '@/types/api';
import OurActivities from './our-activities'
import FeatureSection from './feature-section'
import HeroSection from './hero-section'
import CaseStudies from './case-studies'
import AboutBasic from './about-basic'
import ExploreSection from './explore-section'
import InteractiveMap from './interactive-map'

interface HomePageProps {
  pageData: PageData;
}

export default function HomePage({ pageData }: HomePageProps) {
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
