var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true })

nightmare
  .goto('http://google.com')
  .type('form[action*="/search"] [name=q]', 'github nightmare')
  .click('form[action*="/search"] [type=submit]')
  .wait('#resultStats')
  .evaluate(function () {
    return document.querySelector('#resultStats')
  })
  .end()
  .then(function (result) {
    console.log(result)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });