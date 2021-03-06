import Controller from '@ember/controller';
import {inject as service } from '@ember/service';
import $ from 'jquery';
import ENV from '../../config/environment';
import {run} from '@ember/runloop';

export default Controller.extend({
  session: service(),

  actions: {
    signup() {
        $.ajax({
          url: ENV.baseAPIRoute+'signup',
          type: 'POST',
          data: JSON.stringify({
            email: $('#email').val(),
            name: $('#name').val(),
            password: $('#password').val()
          }),
          contentType: 'application/json',
          crossOrigin: false
        }).then(function(response) {
          console.log(response);
          this.transitionToRoute('index');
        }, function(xhr) {
          console.log(xhr.responseJSON.error);
        });
    }
  }
});
