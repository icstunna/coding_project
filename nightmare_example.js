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
    var titles = []
    returnList.push(document.querySelector('#resultStats').innerHTML);
    titles.push(document.querySelector('.r > a').innerHTML)
    var titlesPartTwo = document.querySelector('.srg').children;
    for (i = 0; i < titlesPartTwo.length; i++) {
      var html = titlesPartTwo[i].children[0].children[0].children[0].innerHTML
      titles.push(html)
    }

    returnList.push(titles)
    return returnList
  })
  .end()
  .then(function (result) {
    // var regex = /\d\d\d,\d\d\d/;
    // var intString = result[0].match(regex)[0]
    // output["number_of_results"] = intString
    // output["the_rest"] = result
    console.log(result)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });