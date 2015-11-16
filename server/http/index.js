import config from 'config';
import path from 'path';
const clientPath = config.get('paths.client');
function clientRelative(rel) {
  return path.join(clientPath, rel);
}

import {useUsersApi, useAuthApi} from '../auth/express';

import usefulHttpBuilder from 'useful-http';

export default function http() {
  return usefulHttpBuilder()
    .configureSecurity({forceSsl: false})
    .handleRobots({disallow: config.get('robotsDisallow')})
    .log({stream: config.get('httpLogStream')})
    // TODO serve-favicon middleware
    .compress()
    .serveFonts()
    .renderIndex({
      serverPagesDir: clientRelative('server-views'),
      clientRoutes: ['doctors', 'clinics', 'errors', 'users']})
    .parseBody()
    .tap(useUsersApi)
    .tap(useAuthApi)
    // TODO API routes
    .serveStatic({dirs:
      [clientRelative('jspm-sfx'),
        clientRelative('jspm-src'),
        clientRelative('static')]})
    .handleErrors()
  .build();
}
