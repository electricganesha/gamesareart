import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    release_date: DS.attr('date'),
    posted_at : DS.attr('date', { defaultValue: Date.now() }),
    authors: DS.attr(),
    publisher: DS.attr('string'),
    video_link: DS.attr('string'),
    buy_link: DS.attr('string'),
    tags: DS.attr(),
    likes: DS.attr('number'),
});
