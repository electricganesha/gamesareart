import Route from '@ember/routing/route'
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});