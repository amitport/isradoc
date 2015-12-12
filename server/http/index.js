import config from 'config';
import path from 'path';
const clientPath = config.get('paths.client');
function clientRelative(rel) {
  return path.join(clientPath, rel);
}

import {useUsersApi, useAuthApi} from '../auth/express';

import usefulHttpBuilder from 'useful-http';

import recommendationsRouter from './routers/recommendations';
import doctorsRouter from './routers/doctors';
import supportPhotoUpload from './upload';

export default function http() {
  return usefulHttpBuilder()
    .configureSecurity({forceSsl: false})
    .handleRobots({disallow: config.get('robotsDisallow')})
    .log({stream: config.get('httpLogStream')})
    // TODO serve-favicon middleware
    .compress()
    .tap(supportPhotoUpload)
    .serveFonts()
    .renderIndex({
      serverPagesDir: clientRelative('server-views'),
      clientRoutes: ['doctors', 'clinics', 'errors', 'users']})
    .parseBody()
    .tap(useUsersApi)
    .tap(useAuthApi)
    .tap(function (app) {
      // add routers
      app.use(recommendationsRouter);
      app.use('/api', doctorsRouter)
    })
    // TODO API routes
    .serveStatic({dirs:
      [clientRelative('jspm-sfx'),
        clientRelative('jspm-src'),
        clientRelative('static')]})
    .handleErrors()
  .build();
}
