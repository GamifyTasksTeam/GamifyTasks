window.ClientValidation = function() {
	$("#newTaskForm").validate({
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