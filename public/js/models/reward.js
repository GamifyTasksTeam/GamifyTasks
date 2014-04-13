Gamify.Categories = DS.Model.extend({
	green: DS.attr('number'),
	purple: DS.attr('number'),
	red: DS.attr('number'),
	blue: DS.attr('number'),
	reward: DS.belongsTo('Gamify.Reward')
});

Gamify.Reward = DS.Model.extend({
	userID: DS.attr('string'),
	name: DS.attr('string'),
	"__v" : DS.attr('number')
});

//DS.RESTAdapter.map('Gamify.Reward', {
//	categories: { embedded: 'always' }
//});