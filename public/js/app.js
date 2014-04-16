window.Gamify = Ember.Application.create();

Gamify.ApplicationAdapter = DS.RESTAdapter.extend({
	namespace: "api"
	
});

Gamify.ApplicationSerializer = DS.RESTSerializer.extend({
  primaryKey: '_id'
});

Gamify.GamifyView = Ember.View.extend({
    templateName: 'gamify',
    didInsertElement: function() {
    	window.ClientValidation();
    }
});

Gamify.NumberField = Ember.TextField.extend({
	type: 'number',
    attributeBindings: ['name', 'min', 'max', 'step']
});