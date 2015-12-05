import express from 'express';
import Doctor from '../../models/doctor';
import {ensureUser} from '../../auth/express';

import config from 'config';
const log = config.get('log');

const router = express.Router();

router.post('/doctors', ensureUser, function (req, res) {
  const doctor = new Doctor();

  doctor.title = req.body.title;
  doctor.firstName = req.body.firstName;
  doctor.lastName = req.body.lastName;
  doctor.tagline = req.body.tagline;
  doctor.mainPhone = req.body.mainPhone;

  doctor.owner = req.user._id;

  doctor.save(function(err) {
    if (err) {
      log.error(err);
      return res.status(500).send(err.message);
    }

    res.status(201).location(`api/doctors/${doctor._id}`).send(
      {_id: doctor._id, createdAt: doctor.createdAt, owner: doctor.owner}
    );
  });
});

router.get('/doctors', function (req, res) {
  Doctor
    .find({})
    .select('-__v')
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

router.get('/doctors/:id',  function (req, res) {
  Doctor
    .findById(req.params.id)
    .select('-__v')
    .exec()
    .then(function (doctor) {
      if (!doctor) {
        res.status(404).send();
      } else {
        res.send(doctor);
      }
    }, function (err) {
      res.status(500).send(err);
    });
});

export default router;

