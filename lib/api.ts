import type { PageData } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined in environment variables');
}

export async function getPageData(lang: string = 'en'): Promise<PageData> {
  try {
    // Log để debug
    console.log('Fetching data from:', API_BASE_URL);
    console.log('Current language:', lang);

    // Thêm timestamp để tránh cache của browser
    const timestamp = new Date().getTime();
    const url = `${API_BASE_URL}/pages?lang=${lang}&_t=${timestamp}`;
    
    console.log('Full URL:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API call failed with status: ${response.status}, message: ${errorText}`
      );
    }

    const data = await response.json();
    
    // Log response data để debug
    console.log('API Response:', data);
    
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error('Invalid API response format');
    }

    return data[0]; // The API returns an array with one item
  } catch (error) {
    // Chi tiết hóa error message
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Unknown error occurred';
      
    console.error('Error fetching page data:', {
      message: errorMessage,
      url: API_BASE_URL,
      language: lang,
      error
    });

    // Throw error với message rõ ràng hơn
    throw new Error(`Failed to fetch data: ${errorMessage}`);
  }
} 