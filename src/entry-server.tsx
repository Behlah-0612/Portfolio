import { renderToString } from 'react-dom/server';
import App from './App';

/** Renders the whole page to an HTML string at build time (see scripts/prerender.mjs). */
export function render() {
  return renderToString(<App />);
}
