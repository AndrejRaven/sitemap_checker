import axios from 'axios';
import * as xml2js from 'xml2js';

export const validateUrl = (url: string) => {
  const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  return urlPattern.test(url);
};

export const fetchSitemapUrls = async (sitemapUrl: string): Promise<string[]> => {
  const response = await axios.get('/api/fetch-sitemap', {
    params: { url: sitemapUrl }
  });
  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(response.data);
  return result.urlset.url.map((item: any) => item.loc[0]);
};

export const checkUrls = (urls: string[], sitemapUrls: string[]): { url: string; inSitemap: boolean }[] => {
  return urls.map(url => ({
    url,
    inSitemap: sitemapUrls.includes(url),
  }));
};