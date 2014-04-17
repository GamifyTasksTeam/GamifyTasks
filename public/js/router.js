Gamify.Router.map(function () {
	this.resource('gamify', { path: '/' });
});

Gamify.GamifyRoute = Ember.Route.extend({
  model: function () {
  return Ember.RSVP.hash({
	wallet: this.store.find('wallet'),
	tasks: this.store.find('task'),
	rewards: this.store.find('reward')
	})
  },
  setupController: function(controller, model){
	controller.set('model', model);//UsersEditController
    this.controllerFor('task').set('model',this.store.find('task'));
  }
});
