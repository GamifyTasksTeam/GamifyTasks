Gamify.GamifyController = Ember.ObjectController.extend({
	actions: {
		finishTask: function (task, wallet) {
			console.log(wallet.get('red'));
			wallet.set('red', wallet.get('red')+task.get('red'));
			wallet.set('green', wallet.get('green')+task.get('green'));
			wallet.set('blue', wallet.get('blue')+task.get('blue'));
			task.deleteRecord();
		}
	}
});