window.ClientValidation = function() {
	$.validator.addMethod("integer",function (value, element){
		return +value === parseInt(value, 10); 

    }, 'This field must contain a valid integer');
	
	$("#newTaskForm").validate({
		rules: {
			newTaskName: {
				required: true
			},
			newTaskRed: {
				required: true,
				integer: true
			},
			newTaskGreen: {
				required: true,
				integer: true
			},
			newTaskBlue: {
				required: true,
				integer: true
			},
			newTaskPurple: {
				required: true,
				integer: true
			}
		},
		messages: {
			newTaskName: {
				required: "Please enter the task name"
			},
			newTaskRed: {
				required: "Please enter the red points",
				integer: "The red points must be an integer"
			},
			newTaskGreen: {
				required: "Please enter the green points",
				integer: "The green points must be an integer"
			},
			newTaskBlue: {
				required: "Please enter the blue points",
				integer: "The blue points must be an integer"
			},
			newTaskPurple: {
				required: "Please enter the purple points",
				integer: "The purple points must be an integer"
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
				required: true,
				integer: true
			},
			newRewardGreen: {
				required: true,
				integer: true
			},
			newRewardBlue: {
				required: true,
				integer: true
			},
			newRewardPurple: {
				required: true,
				integer: true
			}
		},
		messages: {
			newRewardName: {
				required: "Please enter the reward name"
			},
			newRewardRed: {
				required: "Please enter the red points",
				integer: "The red points must be an integer"
			},
			newRewardGreen: {
				required: "Please enter the green points",
				integer: "The green points must be an integer"
			},
			newRewardBlue: {
				required: "Please enter the blue points",
				integer: "The blue points must be an integer"
			},
			newRewardPurple: {
				required: "Please enter the purple points",
				integer: "The purple points must be an integer"
			}
		},
		errorLabelContainer: "#newRewardFormError",
		wrapper: "li"
	});
}