import Base from 'ember-simple-auth/authorizers/base';
import {isEmpty} from '@ember/utils';

var CustomAuthorizer = Base.extend({
  // implement heyar!
  authorize: function(jqXHR /*, requestOptions*/) {
    if (this.get('session.isAuthenticated') && !isEmpty(this.get('session.token'))) {
      jqXHR.setRequestHeader('token', this.get('session.token'));
    }
  }
});

export var initialize = function(container) {
  container.register('authorizer:custom', CustomAuthorizer);
};

export default {
  name: 'authorization',
  before: 'ember-simple-auth',
  initialize: initialize
};