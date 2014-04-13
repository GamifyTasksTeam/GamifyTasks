Gamify.GamifyController = Ember.ObjectController.extend({
	actions: {
		finishTask: function (task, wallet) {
			wallet.set('red', wallet.get('red')+task.get('red'));
			wallet.set('green', wallet.get('green')+task.get('green'));
			wallet.set('blue', wallet.get('blue')+task.get('blue'));
			task.deleteRecord();
			task.save();
			wallet.save();
		},
		
		addTask: function(){
			 var task = this.store.createRecord('task', {
			name: this.get('newTitle'),
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
			task.save();
		},
		
		redeemReward: function(reward, wallet) {
			wallet.set('red', wallet.get('red') - reward.get('red'));
			wallet.set('green', wallet.get('green') - reward.get('green'));
			wallet.set('blue', wallet.get('blue') - reward.get('blue'));
			wallet.set('purple', wallet.get('purple') - reward.get('purple'));
			reward.deleteRecord();
			
			reward.save();
			wallet.save();
		},
		

		addReward : function() {
			var reward = this.store.createRecord('reward', {
				name : this.get('newRewardTitle'),
				red : parseInt(this.get('newRewardRed')),
				green : parseInt(this.get('newRewardGreen')),
				blue : parseInt(this.get('newRewardBlue')),
				purple : parseInt(this.get('newRewardPurple'))
			});

			// Clear the "New Todo" text field
			this.set('newRewardTitle', '');
			this.set('newRewardRed', '');
			this.set('newRewardGreen', '');
			this.set('newRewardBlue', '');
			this.set('newRewardPurple', '');

			// Save the new model
			reward.save();
		}
	}
});