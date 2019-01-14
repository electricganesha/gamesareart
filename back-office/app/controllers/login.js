import Controller from '@ember/controller';
import {
  inject as service
} from '@ember/service';

import $ from 'jquery';

export default Controller.extend({
  session: service(),
  actions: {
    authenticate() {
      var controller = this;
      this.get('session').authenticate('authenticator:custom', {
        email: $('#email').val(),
        password: $('#password').val()
      }).then(function () {
        controller.transitionToRoute('index');
      }, function (err) {
        console.log('LOGIN FAILURE');
        console.log(err);
        controller.set('error', true);
      });
    }
  }
});