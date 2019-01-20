import Base from 'ember-simple-auth/authenticators/base';
import ENV from '../config/environment';
import {inject as service} from '@ember/service';
import $ from 'jquery';
import {run} from '@ember/runloop';
import {Promise} from 'rsvp';
import {isEmpty} from '@ember/utils';

var CustomAuthenticator = Base.extend({
  ajax: service(),
  restore: function(data) {
    return new Promise(function(resolve, reject) {
      if (!isEmpty(data.token)) {
        $.ajax({
          url: ENV.baseAPIRoute+'validate',
          type: 'POST',
          data: JSON.stringify({
            token: data.token
          }),
          contentType: 'application/json'
        }).then(function() {
          resolve(data);
        }, function(err) {
          reject(err);
        });
      }
      else {
        reject();
      }
    });
  },

  authenticate: function(creds) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: ENV.baseAPIRoute+'login',
        type: 'POST',
        data: JSON.stringify({
          email: creds.email,
          password: creds.password
        }),
        contentType: 'application/json',
        crossOrigin: false
      }).then(function(response) {
        run(function() {
          resolve({ token: response.token });
        });
      }, function(xhr, status, error) {
        run(function() {
          reject(error);
        });
      });
    });
  },

  invalidate: function(/* data */) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: ENV.baseAPIRoute+'logout',
        type: 'GET'
      }).then(function() {
        run(function() {
          resolve();
        });
      }, function(err) {
        run(function() {
          reject(err);
        });
      });
    });
  }
});

export var initialize = function(container) {
  container.register('authenticator:custom', CustomAuthenticator);
};

export default {
  name: 'authentication',
  before: 'ember-simple-auth',
  initialize: initialize
};
