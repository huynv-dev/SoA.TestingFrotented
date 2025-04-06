'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getPageData } from '@/lib/api';
import type { PageData } from '@/types/api';
import Footer from '~/components/footer';
import { Header } from '~/components/header';
import HomePage from '~/components/home';

export default function Home() {
  const searchParams = useSearchParams();
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const lang = searchParams.get('lang') || 'en';
        const data = await getPageData(lang);
        setPageData(data);
      } catch (error) {
        console.error('Error fetching page data:', error);
        setError('Failed to load page data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-[#F2542D] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!pageData) {
    return null;
  }

  return (
    <Suspense>
      <Header menuItems={pageData.head_menu} />
      <HomePage pageData={pageData} />
      <Footer address={pageData.footer.address} links={pageData.footer.links} />
    </Suspense>
  );
}
