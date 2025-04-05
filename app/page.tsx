import { getPageData } from '@/lib/api';
import Footer from '~/components/footer';
import { Header } from '~/components/header';
import HomePage from '~/components/home';

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const pageData = await getPageData();

  return (
    <>
      <Header menuItems={pageData.head_menu} />
      <HomePage pageData={pageData} />
      <Footer address={pageData.footer.address} links={pageData.footer.links} />
    </>

  );
}