window.ClientValidation = function() {
	$("#newTaskForm").validate({
		rules: {
			newTaskName: {
				required: true
			},
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
			newTaskName: {
				required: "Please enter the task name"
			},
			newTaskRed: {
				required: "Please enter the red points"
			},
			newTaskGreen: {
				required: "Please enter the green points"
			},
			newTaskBlue: {
				required: "Please enter the blue points"
			},
			newTaskPurple: {
				required: "Please enter the purple points"
			}
		},
		errorLabelContainer: "#newTaskFormError",
		wrapper: "li"
	});
	
	$("#newRewardForm").validate({
		rules: {
			newRewardName: {
				required: true
			},
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
			newRewardName: {
				required: "Please enter the reward name"
			},
			newRewardRed: {
				required: "Please enter the red points"
			},
			newRewardGreen: {
				required: "Please enter the green points"
			},
			newRewardBlue: {
				required: "Please enter the blue points"
			},
			newRewardPurple: {
				required: "Please enter the purple points"
			}
		},
		errorLabelContainer: "#newRewardFormError",
		wrapper: "li"
	});
}