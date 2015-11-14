import config from 'config';
import http from './http';
const log = config.get('log');

import initializeModelsConnection from './models/initializeModelsConnection';
initializeModelsConnection();

http().listen(config.get('port'), function () {
  log.info(`server listening on ${this.address().port}`);
});

