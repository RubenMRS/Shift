/* oxlint-disable react/only-export-components -- build-only entry, not a Fast Refresh component */
import { renderToString } from 'react-dom/server';
import App from './App';
export { routes, routeMeta, structuredData, SITE_URL } from './data/routes';
export function render(path: string) { return renderToString(<App path={path} />); }
