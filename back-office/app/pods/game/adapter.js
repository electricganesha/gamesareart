import DS from 'ember-data';
import ENV from '../../config/environment';

export default DS.JSONAPIAdapter.extend({
    ajaxError: function() {
      console.log('error');
    },
    namespace: 'api',
    host: 'http://localhost:3001',

    buildURL: function(type, id, record) {
      //call the default buildURL and then append a slash
      return this._super(type, id, record);
    }
});
