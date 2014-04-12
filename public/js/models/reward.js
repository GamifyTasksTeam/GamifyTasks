Gamify.Reward = DS.Model.extend({
	userID: DS.attr('string'),
	name: DS.attr('string'),
	categories: DS.belongsTo('Gamify.Categories')
});

Gamify.Categories = DS.Model.extend({
	green: DS.attr('number'),
	purple: DS.attr('number'),
	red: DS.attr('number'),
	blue: DS.attr('number'),
	reward: DS.belongsTo('Gamify.Reward')
});

DS.RESTAdapter.map('Gamify.Reward', {
	categories: { embedded: 'always' }
};