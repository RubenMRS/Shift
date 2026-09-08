import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

document.documentElement.classList.add('js');
const root = document.getElementById('root')!;
const app = <App path={window.location.pathname} />;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
