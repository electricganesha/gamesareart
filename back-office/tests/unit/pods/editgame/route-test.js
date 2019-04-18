import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | editgame', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:editgame');
    assert.ok(route);
  });
});
