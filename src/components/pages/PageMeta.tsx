import { useEffect } from 'react';

type PageMetaProps = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

const SITE_URL = 'https://shiftai.pt';

function setMeta(selector: string, attribute: 'content' | 'href', value: string) {
  const element = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  element?.setAttribute(attribute, value);
}

export function PageMeta({ title, description, path, noIndex = false }: PageMetaProps) {
  useEffect(() => {
    const canonical = `${SITE_URL}${path}`;
    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[name="robots"]', 'content', noIndex ? 'noindex, follow' : 'index, follow');
    setMeta('link[rel="canonical"]', 'href', canonical);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', canonical);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
  }, [description, noIndex, path, title]);

  return null;
}
