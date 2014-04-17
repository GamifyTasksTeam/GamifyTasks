Gamify.TaskController = Ember.ArrayController.extend({
	actions: {
		finishTask: function (task, wallet) {
			wallet.set('red', wallet.get('red')+task.get('red'));
			wallet.set('green', wallet.get('green')+task.get('green'));
			wallet.set('blue', wallet.get('blue')+task.get('blue'));
			wallet.set('purple', wallet.get('purple')+task.get('purple'));
			task.deleteRecord();
			task.save();
			wallet.save();
		},
		
		addTask: function(){
			 var task = this.store.createRecord('task', {
			name: this.get('newTitle'),
			red: parseInt(this.get('newRed')),
			green: parseInt(this.get('newGreen')),
			blue: parseInt(this.get('newBlue')),
			purple: parseInt(this.get('newPurple'))
			});

			// Clear the "New Todo" text field
			this.set('newTitle', '');
			this.set('newRed', '');
			this.set('newGreen', '');
			this.set('newBlue', '');
			this.set('newPurple','');
	
			// Save the new model
			task.save();
		},
		
		editTask: function(task){
			task.set(isEditing,true);
		},
		
		deleteTask: function(task){
			task.deleteRecord();
			task.save();
		},
	}
})