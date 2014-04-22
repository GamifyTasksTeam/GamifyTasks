Gamify.GamifyController = Ember.ObjectController.extend(Ember.Evented, {
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
			this.trigger('itemAdded');
		},
		
		startEditTask: function(task){
			var normal = "#"+task.id+"normal";
			var edit = "#"+task.id+"edit";
			jQuery(normal).hide();
			jQuery(edit).show();
		},
		
		finishEditTask: function(task){
			task.save();
			var normal = "#"+task.id+"normal";
			var edit = "#"+task.id+"edit";
			jQuery(edit).hide();
			jQuery(normal).show();
		},
		
		deleteTask: function(task){
			task.deleteRecord();
			task.save();
		},
		
		redeemReward: function(reward, wallet) {
			wallet.set('red', wallet.get('red') - reward.get('red'));
			wallet.set('green', wallet.get('green') - reward.get('green'));
			wallet.set('blue', wallet.get('blue') - reward.get('blue'));
			wallet.set('purple', wallet.get('purple') - reward.get('purple'));
			if (!reward.get('persistent')) {
				reward.deleteRecord();
				reward.save();
			}
			wallet.save();
		},
		

		addReward : function() {
			var reward = this.store.createRecord('reward', {
				name : this.get('newRewardTitle'),
				red : parseInt(this.get('newRewardRed')),
				green : parseInt(this.get('newRewardGreen')),
				blue : parseInt(this.get('newRewardBlue')),
				purple : parseInt(this.get('newRewardPurple')),
				persistent : this.get('newRewardPersistent')
			});

			// Clear the "New Todo" text field
			this.set('newRewardTitle', '');
			this.set('newRewardRed', '');
			this.set('newRewardGreen', '');
			this.set('newRewardBlue', '');
			this.set('newRewardPurple', '');
			this.set('newRewardPersistent', false)

			// Save the new model
			reward.save();
			
			this.trigger('itemAdded');
		},
		startEditReward: function(reward){
			var normal = "#"+reward.id+"normal";
			var edit = "#"+reward.id+"edit";
			jQuery(normal).hide();
			jQuery(edit).show();
		},
		
		finishEditReward: function(reward){
			reward.save();
			var normal = "#"+reward.id+"normal";
			var edit = "#"+reward.id+"edit";
			jQuery(edit).hide();
			jQuery(normal).show();
		},
		
		deleteReward: function(reward){
			reward.deleteRecord();
			reward.save();
		}
	}
});