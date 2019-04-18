import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import $ from 'jquery';
import ENV from '../../config/environment';
import {
  run
} from '@ember/runloop';
import {
  computed
} from '@ember/object';

export default Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.store.findRecord('game', params.game_id)
  },
  gameId: computed.alias('model.id'),
  actions: {
    editGame: function (form) {
      const gameId = this.get('model.id');
      return new Promise(function (resolve, reject) {
        $.ajax({
          url: ENV.baseAPIRoute + 'api/games/'+gameId,
          type: 'PUT',
          data: JSON.stringify(form),
          contentType: 'application/json',
          crossOrigin: false
        }).then(function (response) {
          run(function () {
            this.store.push(response);
            this.transitionTo('all-games');
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
