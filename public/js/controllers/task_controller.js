Gamify.GamifyController = Ember.ObjectController.extend({
	actions: {
		finishTask: function (task, wallet) {
			wallet.set('red', wallet.get('red')+task.get('red'));
			wallet.set('green', wallet.get('green')+task.get('green'));
			wallet.set('blue', wallet.get('blue')+task.get('blue'));
			task.deleteRecord();
		},
		
		addTask: function(){
			 var task = this.store.createRecord('task', {
			task: this.get('newTitle'),
			red: parseInt(this.get('newRed')),
			green: parseInt(this.get('newGreen')),
			blue: parseInt(this.get('newBlue'))
			});

		// Clear the "New Todo" text field
		this.set('newTitle', '');
		this.set('newRed', '');
		this.set('newGreen', '');
		this.set('newBlue', '');

		// Save the new model
		todo.save();
		}
	}
});