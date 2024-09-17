import * as XLSX from 'xlsx';
import axios from 'axios';
import * as xml2js from 'xml2js';

export const generateReport = (results: { url: string; inSitemap: boolean }[]) => {
  const foundUrls = results.filter(r => r.inSitemap).map(r => r.url);
  const notFoundUrls = results.filter(r => !r.inSitemap).map(r => r.url);
  const maxLength = Math.max(foundUrls.length, notFoundUrls.length);

  const data = Array(maxLength).fill(null).map((_, i) => ({
    "Found URLs": foundUrls[i] || "",
    "Not Found URLs": notFoundUrls[i] || ""
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const colWidths = [{ wch: 50 }, { wch: 50 }];
  worksheet['!cols'] = colWidths;

  const greenFill = { fgColor: { rgb: "90EE90" } };
  const redFill = { fgColor: { rgb: "FFC0CB" } };

  for (let i = 0; i < maxLength + 1; i++) {
    const foundCell = XLSX.utils.encode_cell({ r: i, c: 0 });
    const notFoundCell = XLSX.utils.encode_cell({ r: i, c: 1 });

    if (!worksheet[foundCell]) worksheet[foundCell] = {};
    if (!worksheet[notFoundCell]) worksheet[notFoundCell] = {};

    worksheet[foundCell].s = { fill: greenFill };
    worksheet[notFoundCell].s = { fill: redFill };
  }

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
  XLSX.writeFile(workbook, "sitemap_report.xlsx");
};

export const downloadSitemapUrls = async (sitemapUrl: string) => {
  const response = await axios.get('/api/fetch-sitemap', {
    params: { url: sitemapUrl }
  });
  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(response.data);
  const sitemapUrlsToDownload = result.urlset.url.map((item: any) => item.loc[0]);

  const worksheet = XLSX.utils.json_to_sheet(sitemapUrlsToDownload.map(url => ({ URL: url })));
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sitemap URLs");
  XLSX.writeFile(workbook, "sitemap_urls.xlsx");
};