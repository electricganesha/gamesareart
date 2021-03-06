import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('signup');
  this.route('allgames');
  this.route('newgame');
  this.route('alltags');
  this.route('editgame', { path: 'editgame/:game_id' });
});

export default Router;
