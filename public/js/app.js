window.Gamify = Ember.Application.create();

Gamify.ApplicationAdapter = DS.RESTAdapter.extend({
	namespace: "api",
	ajaxError: function(jqXHR){
		if(jqXHR.status===401){
			window.location="http://localhost:8080/login";
		}
		var error = this._super(jqHXR);
	}
	
});

Gamify.ApplicationSerializer = DS.RESTSerializer.extend({
  primaryKey: '_id',
});

Gamify.GamifyView = Ember.View.extend({
    templateName: 'gamify',
    didInsertElement: function() {
    	window.ClientValidation();
    	this.get('controller').on('itemAdded', this, this.setupValidation);
    },
    setupValidation: function() {
	  Ember.run.next(this, function() {
		  setTimeout(function() {
			  window.ClientValidation();
		  }, 100);
	  });
    }
});

Gamify.NumberField = Ember.TextField.extend({
	type: 'number',
    attributeBindings: ['name', 'min', 'max', 'step']
});