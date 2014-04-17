Gamify.Reward = DS.Model.extend({
	userID: DS.attr('string'),
	name: DS.attr('string'),
	green: DS.attr('number'),
	purple: DS.attr('number'),
	red: DS.attr('number'),
	blue: DS.attr('number'),
	normalId: function() {
    return  this.get('id')+"normal";
  }.property('id'),
  editId: function() {
    return this.get('id')+"edit";
  }.property('id')
});
