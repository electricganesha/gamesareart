import Component from '@ember/component';
import {
  computed
} from '@ember/object';
import {
  A
} from '@ember/array';

export default Component.extend({
  init() {
    this._super(...arguments);
    this.set('errors', []);
    this.set('model.posted_at', new Date(Date.now()));
  },
  defaultDate: computed('model.release_date', function () {
    return Date.now()
  }),
  dateValue: Date.now(),
  authors: A([]),
  tags: A([]),
  isSubmitButtonDisabled: computed('model.{name,release_date,description}', function(){
    const hasName = this.get('model.name') === (undefined || '');
    const hasDescription = this.get('model.description') === (undefined || '');
    const hasDate = (typeof this.get('model.release_date')) === 'undefined';
    const hasPostedAt = this.get('model.posted_at') === new Date(Date.now());
    const hasAuthors = this.get('model.posted_at').length > 0;
    const hasPublisher = this.get('model.publisher') === (undefined || '');
    const hasVideoLink = this.get('model.video_link') === (undefined || '');
    const hasBuyLink = this.get('model.buy_link') === (undefined || '');

    return (hasName ||
      hasDescription ||
      hasDate ||
      hasPostedAt ||
      hasAuthors ||
      hasPublisher ||
      hasVideoLink ||
      hasBuyLink)
  }),
  actions: {
    chooseDate: function (date) {
      this.set('dateValue', new Date(date[0]));
      this.set('model.release_date', new Date(date[0]));
    },
    addAuthor: function () {
      this.authors.pushObject('');
      this.set('model.authors', this.authors);
    },
    changeAuthor: function (author, index) {
      this.authors[index] = author;
      this.set('model.authors', this.authors);
    },
    addTag(tag) {
      this.tags.pushObject(tag);
      this.set('model.tags', this.tags);
    },

    removeTagAtIndex(index) {
      this.tags.removeAt(index);
      this.set('model.tags', this.tags);
    }
  }
});
