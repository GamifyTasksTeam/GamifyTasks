window.ClientValidation = function() {
	$.validator.addMethod("integer",function (value, element){
		return +value === parseInt(value, 10); 
    }, 'This field must contain a valid integer');
	
	$('.taskForm').each(function() {
		$(this).validate({
			rules: {
				taskName: {
					required: true
				},
				taskRed: {
					required: true,
					integer: true
				},
				taskGreen: {
					required: true,
					integer: true
				},
				taskBlue: {
					required: true,
					integer: true
				},
				taskPurple: {
					required: true,
					integer: true
				}
			},
			messages: {
				taskName: {
					required: "Please enter the task name"
				},
				taskRed: {
					required: "Please enter the red points",
					integer: "The red points must be an integer"
				},
				taskGreen: {
					required: "Please enter the green points",
					integer: "The green points must be an integer"
				},
				taskBlue: {
					required: "Please enter the blue points",
					integer: "The blue points must be an integer"
				},
				taskPurple: {
					required: "Please enter the purple points",
					integer: "The purple points must be an integer"
				}
			},
			errorLabelContainer: '#' + $(this).attr("id") + " .taskFormError",
			wrapper: "li"
		});
	});
		
	$('.rewardForm').each(function() {
		$(this).validate({
			rules: {
				rewardName: {
					required: true
				},
				rewardRed: {
					required: true,
					integer: true
				},
				rewardGreen: {
					required: true,
					integer: true
				},
				rewardBlue: {
					required: true,
					integer: true
				},
				rewardPurple: {
					required: true,
					integer: true
				}
			},
			messages: {
				rewardName: {
					required: "Please enter the reward name"
				},
				rewardRed: {
					required: "Please enter the red points",
					integer: "The red points must be an integer"
				},
				rewardGreen: {
					required: "Please enter the green points",
					integer: "The green points must be an integer"
				},
				rewardBlue: {
					required: "Please enter the blue points",
					integer: "The blue points must be an integer"
				},
				rewardPurple: {
					required: "Please enter the purple points",
					integer: "The purple points must be an integer"
				}
			},
			errorLabelContainer: '#' + $(this).attr('id') + " .rewardFormError",
			wrapper: "li"
		});
	});
}