import { getPageData } from '@/lib/api';
import type { PageData } from '@/types/api';
import Footer from '~/components/footer';
import { Header } from '~/components/header';
import HomePage from '~/components/home';
import { getTranslation } from '@/lib/getTranslation';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const lang = (await params).locale || 'en';
  let pageData: PageData | null = null;

  try {
    pageData = await getPageData(lang);
  } catch (error) {
    console.error('Error fetching page data:', error);
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Failed to load page data
      </div>
    );
  }

  if (!pageData) return null;
  const t = getTranslation(lang);

  return (
    <>
      <Header menuItems={pageData.head_menu} />
      <HomePage pageData={pageData} />
      <Footer address={pageData.footer.address} links={pageData.footer.links} />
    </>
  );
}
