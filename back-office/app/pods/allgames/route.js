import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';
import { get } from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin,
{
  model() {
    return this.store.findAll('game');
  },
  store: service(),
  flashMessages: service(),
  actions: {
    deleteGame: function (gameToDelete) {
      const store = this.get('store');
      const flashMessages = this.get('flashMessages');
      return new Promise(function (resolve, reject) {
        store.findRecord('game', gameToDelete.id, { backgroundReload: false }).then(function(game) {
          game.deleteRecord();
          game.get('isDeleted'); // => true
          game.save(); // => DELETE
          flashMessages.success(game.name+' has been successfully deleted');
        });
      });
    }
  }
});
