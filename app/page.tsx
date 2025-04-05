import { getPageData } from '@/lib/api';
import Footer from '~/components/footer';
import { Header } from '~/components/header';
import HomePage from '~/components/home';

type Params = Promise<{ lang: string }>
export default async function Home({ params }: { params: Params }) {
  const { lang } = await params
  const pageData = await getPageData(lang || 'fr'); // fallback 'fr' nếu không có lang

  return (
    <>
      <Header menuItems={pageData.head_menu} />
      <HomePage pageData={pageData} />
      <Footer address={pageData.footer.address} links={pageData.footer.links} />
    </>
  );
}
