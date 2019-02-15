import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import $ from 'jquery';
import ENV from '../../config/environment';
import {
  run
} from '@ember/runloop';

export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.store.createRecord('game');
  },
  actions: {
    submitNewGame: function (form) {
      return new Promise(function (resolve, reject) {
          console.log(JSON.stringify(form));
        $.ajax({
          url: ENV.baseAPIRoute + 'api/games',
          type: 'POST',
          data: JSON.stringify(form),
          contentType: 'application/json',
          crossOrigin: false
        }).then(function (response) {
          run(function () {
            this.store.push(response);
            this.transitionTo('all-games');
            //resolve({ token: response.token });
          });
        }, function (xhr, status, error) {
          run(function () {
            reject(error);
          });
        });
      });
    }
  }
});
