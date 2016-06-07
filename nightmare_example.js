var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true })

nightmare
  .goto('http://google.com')
  .type('form[action="/search"] [name=q]', 'captain 401k')
  .click('form[action="/search"] [type=submit]')
  .wait('#resultStats')
  .evaluate(function () {
    return document.querySelector('#resultStats').innerHTML;
  })
  .end()
  .then(function (result) {
    var re = /\d\d\d,\d\d\d/;
    var k = result.match(re)
    var test = {"number_of_results":k[0]}
    console.log(test)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });