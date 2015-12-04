import express from 'express';
import Doctor from '../../models/doctor';


import config from 'config';
const log = config.get('log');

const router = express.Router();

router.get('/doctors', function (req, res) {
  Doctor
    .find({})
    .lean()
    .sort({firstName: 1, lastName: 1})
    .exec()
    .then(function (doctors) {
      res.json(doctors);
    }, function (err) {
      log.error(err);
      res.status(500).send(err);
    });
});

export default router;
