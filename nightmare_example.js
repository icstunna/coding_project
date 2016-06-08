var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });
var output = new Object();

nightmare
  .goto('http://google.com')
  .type('form[action="/search"] [name=q]', 'captain 401k')
  .click('form[action="/search"] [type=submit]')
  .wait('#resultStats')
  .evaluate(function () {
    var returnList = []
    returnList.push(document.querySelector('#resultStats').innerHTML);
    returnList.push(document.querySelector('h3 > a').innerHTML);
    return returnList
  })
  .end()
  .then(function (result) {
    var regex = /\d\d\d,\d\d\d/;
    var intString = result[0].match(regex)[0]
    output["number_of_results"] = intString
    output["the_rest"] = result
    console.log(output)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });