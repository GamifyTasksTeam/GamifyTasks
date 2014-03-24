Gamify.Wallet = DS.Model.extend({
  red: DS.attr('number'),
  green: DS.attr('number'),
  blue: DS.attr('number')
});

Gamify.Wallet.FIXTURES = [
  {
    id: 1,
    red: 7,
    green: 10,
	blue: 47
  }
];