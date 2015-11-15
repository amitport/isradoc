import User from '../models/user';

import config from 'config';
const log = config.get('log');
import express from 'express';
import {encode, decode} from './token';
import request from 'request';

export function ensureUser(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Please Make Sure Your Request Has an Authorization Header');
  }

  let decodedToken;
  try {
    decodedToken = decode(req.headers.authorization.slice(7));
  } catch (e) {
    return res.status(401).send(e.message);
  }
  req.user = decodedToken.user;
  next();

}

export function ensureAdmin(req, res, next) {
  ensureUser(req, res, function() {
    if (req.user.role === 'admin') {
      next();
    } else {
      res.status(401).send('Admin access required');
    }
  });
}

const usersRouter = express.Router();

usersRouter.get('/me', ensureUser, function (req, res) {
  User.findById(req.user._id, '_id displayName avatarImageUrl', {lean: true}, function(err, user) {
    if (err) {
      log.error(err);
      return res.status(500).send('Database error');
    }
    if (user == null) {
      return res.status(404).send('Could not find user');
    }
    res.send(user);
  });
});

usersRouter.get('/', ensureAdmin, function(req, res) {
  User.find({}, '_id displayName avatarImageUrl role', {lean: true},  function(err, users) {
    if (err) {
      log.error(err);
      return res.status(500).send({ message: 'Database error'});
    }
    res.send(users);
  });
});

const authRouter = express.Router();

authRouter.post('/google', function(req, res) {
  // Exchange authorization code for access token.
  request.post({
    url: 'https://accounts.google.com/o/oauth2/token',
    form: {
      code: req.body.code,
      client_id: req.body.clientId,
      client_secret: config.get('auth.googleSecret'),
      redirect_uri: req.body.redirectUri,
      grant_type: 'authorization_code'
    },
    json: true
  }, function(err, response, token) {
    if (err || response.statusCode != 200) {
      log.error(token);
      return res.status(500).send({message: 'Could not retrieve access token from google'});
    }

    // Retrieve profile information about the current user.
    request.get({
      url: 'https://www.googleapis.com/plus/v1/people/me/openIdConnect',
      headers: {
        Authorization: `Bearer ${token.access_token}`
      },
      json: true
    }, function(err, response, profile) {
      if (err || response.statusCode != 200) {
        log.error(profile);
        return res.status(500).send({message: 'Could not retrieve profile information from'});
      }

      // TODO link account (support same account with multiple providers)

      // Create a new user account or return an existing one.
      User.findOne({linkedAuthProviders: {google: profile.sub}}, function(err, existingUser) {
        if (err) {
          log.error(err);
          return res.status(500).send('Database error');
        }
        if (existingUser) {
          return res.send({
            _id: existingUser._id,
            displayName: existingUser.displayName,
            avatarImageUrl: existingUser.avatarImageUrl,
            token: encode(existingUser)
          });
        }
        var user = new User();
        user.linkedAuthProviders = user.linkedAuthProviders || {};
        user.linkedAuthProviders.google = profile.sub;
        user.displayName = profile.name;
        user.email = profile.email;
        user.avatarImageUrl = profile.picture;
        user.save(function(err) {
          if (err) {
            log.error(err);
            return res.status(500).send('Database error');
          }
          return res.send({
            _id: user._id,
            displayName: user.displayName,
            avatarImageUrl: user.avatarImageUrl,
            token: encode(user)
          });
        });
      });
    });
  });
});

export function useUsersApi(app) {
  app.use('/api/users', usersRouter);
}

export function useAuthApi(app) {
  app.use('/api/auth', authRouter);
}
