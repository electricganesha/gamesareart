import Controller from '@ember/controller';
import {
  inject as service
} from '@ember/service';

export default Controller.extend({
  session: service(),
  actions: {
    logout: function() {
      this.get('session').invalidate('authenticator:custom');
    }
  }
});