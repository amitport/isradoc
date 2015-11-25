import express from 'express';
import Recommendation from '../../models/recommendation';
import {ensureUser} from '../../auth/express';

import config from 'config';
const log = config.get('log');

const router = express.Router();

router.post('/recommendations', ensureUser, function (req, res) {
  // Create a new instance of the Beer model
  const recommendation = new Recommendation();

  recommendation.content = req.body.content;
  recommendation.issuer = req.user._id;
  recommendation.target = req.user._id;// TODO actual target id

  recommendation.save(function(err) {
    if (err) {
      console.dir(err);
      log.error(err);
      return res.status(500).send(err.message);
    }

    res.status(201).location(`/recommendations/${recommendation.id}`).send(recommendation.id);
  });
});

router.get('/recommendations', function (req, res) {
  // todo filter by entity id
  Recommendation
    .find({}, 'content createdAt issuer', {lean: true, sort: { _id : -1 }})
    .populate('issuer', 'avatarImageUrl displayName')
    .exec()
  .then(function (recommendations) {
    res.json(recommendations);
  }, function (err) {
    res.status(500).send(err);
  });
});

export default router;
