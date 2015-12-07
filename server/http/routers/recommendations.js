import express from 'express';
import Recommendation from '../../models/recommendation';
import {ensureUser} from '../../auth/express';

import config from 'config';
const log = config.get('log');

const router = express.Router();

router.post('/recommendations', ensureUser, function (req, res) {
  const recommendation = new Recommendation();

  recommendation.content = req.body.content;

  recommendation.issuer = req.user._id;
  recommendation.target = req.body.target;


  recommendation.save(function(err) {
    if (err) {
      log.error(err);
      return res.status(500).send(err.message);
    }

    res.status(201).location(`/recommendations/${recommendation._id}`).send(
      {_id: recommendation._id, createdAt: recommendation.createdAt}
    );
  });
});

router.get('/recommendations', function (req, res) {
  Recommendation
    .find(req.query.q ? JSON.parse(req.query.q) : {}, 'content createdAt updatedAt issuer', {lean: true, sort: { _id : -1 }})
    .populate('issuer', 'avatarImageUrl displayName')
    .exec()
  .then(function (recommendations) {
    res.json(recommendations);
  }, function (err) {
    res.status(500).send(err);
  });
});

router.put('/recommendations/:id', ensureUser, function (req, res) {
  Recommendation
    .findById(req.params.id)
    .exec()
    .then(function (recommendation) {
      if (!recommendation) {
        res.status(404).send();
      } else if (recommendation.issuer.toString() !== req.user._id) {
        res.status(401).send();
      } else {
        recommendation.content = req.body.content;

        recommendation.save(function(err) {
          if (err) {
            log.error(err);
            return res.status(500).send(err.message);
          }
          res.status(200).send({updatedAt: recommendation.updatedAt});
        })
      }
    }, function (err) {
      res.status(500).send(err);
    });
});
router.delete('/recommendations/:id', ensureUser, function (req, res) {
  // todo filter by entity id
  Recommendation
      .findById(req.params.id)
    .exec()
    .then(function (recommendation) {
      if (!recommendation) {
        res.status(404).send();
      } else if (recommendation.issuer.toString() !== req.user._id) {
        res.status(401).send();
      } else {
        recommendation.remove()
          .then(function () {
            res.status(200).send();
          }, function (err) {
            res.status(500).send(err);
          })
      }
    }, function (err) {
      res.status(500).send(err);
    });
});

export default router;

