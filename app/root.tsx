import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import globalStylesUrl from './styles/global.css?url';

export const links = () => [{ rel: 'stylesheet', href: globalStylesUrl }];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
