// Runs after the client and server builds: renders the page to HTML and writes it into dist/index.html,
// so visitors (and search engines) get the full page immediately and React then hydrates it.
import { readFile, writeFile, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const marker = '<div id="root"></div>';
const template = await readFile('dist/index.html', 'utf8');
if (!template.includes(marker)) throw new Error(`Could not find ${marker} in dist/index.html`);

const { render } = await import(pathToFileURL('dist-ssr/entry-server.js').href);
await writeFile('dist/index.html', template.replace(marker, `<div id="root">${render()}</div>`));
await rm('dist-ssr', { recursive: true, force: true });

console.log('Prerendered dist/index.html');
