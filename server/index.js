import config from 'config';
import http from './http';

const log = config.get('log');

http().listen(config.get('port'), function () {
  log.info(`server listening on ${this.address().port}`);
});
