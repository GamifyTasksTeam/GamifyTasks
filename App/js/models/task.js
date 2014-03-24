Gamify.Task = DS.Model.extend({
	 task: DS.attr('string'),
		red: DS.attr('number'),
		green: DS.attr('number'),
		blue: DS.attr('number')
});

Gamify.Task.FIXTURES = [
  {
    id: 1,
    task: 'Do this',
		red: 1,
		green: 2,
		blue: 3
	
  },
  {
	id: 2,
	task: 'Do that',
		red: 3,
		green: 2,
		blue: 1
  }
];