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
  didSubmit: function(response){
    this.store.push(response);
    this.transitionToRoute('allgames');
  },
  actions: {
    submitNewGame: function (form) {
      return new Promise(function (resolve, reject) {
        $.ajax({
          url: ENV.baseAPIRoute + 'api/games',
          type: 'POST',
          data: JSON.stringify(form),
          contentType: 'application/json',
          crossOrigin: false
        }).then(function (response) {
          run(function () {
            this.didSubmit(response);
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
