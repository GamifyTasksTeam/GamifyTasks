window.ClientValidation = function() {
	$("#newTaskForm").validate({
		debug: true,
		rules: {
			newTaskRed: {
				required: true
			},
			newTaskGreen: {
				required: true
			},
			newTaskBlue: {
				required: true
			},
			newTaskPurple: {
				required: true
			}
		},
		messages: {
			
		}
	});
	
	$("#newRewardForm").validate({
		debug: true,
		rules: {
			newRewardRed: {
				required: true
			},
			newRewardGreen: {
				required: true
			},
			newRewardBlue: {
				required: true
			},
			newRewardPurple: {
				required: true
			}
		},
		messages: {
			
		}
	});
}