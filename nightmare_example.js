var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });
var jsonfile = require('jsonfile');
var file = './data.json'
var output = new Object();


function run() {
  var list = []
  nightmare
  .goto('http://google.com')
  .type('form[action="/search"] [name=q]', 'captain 401k')
  .click('form[action="/search"] [type=submit]')
  .wait('#resultStats')
  .evaluate(function (list) {
    var titles = [];
    list.push(document.querySelector('#resultStats').innerHTML);
    titles.push(document.querySelector('.r > a').innerHTML); //the first title is unaccessible otherwise
    var titlesPartTwo = document.querySelector('.srg').children; //this grabs the container of search results
    for (i = 0; i < titlesPartTwo.length; i++) {
      var html = titlesPartTwo[i].children[0].children[0].children[0].innerHTML //this accesses the titles
      titles.push(html)
    }

    list.push(titles)
    return list
  }, list)
  // .click('.pn')
  // .wait(1000)
  // .evaluate(function(list) {
  //   var titlesPartTwo = document.querySelector('.srg').children; //this grabs the container of search results
  //   for (i = 0; i < titlesPartTwo.length; i++) {
  //     var html = titlesPartTwo[i].children[0].children[0].children[0].innerHTML //this accesses the titles
  //     list.push(html)
  //   }
  //   return list
  // }, list)
  .end()
  .then(function (result) {
    var regex = /\d\d\d,\d\d\d/;
    var intString = result[0].match(regex)[0]
    output['number_of_results'] = intString
    output['title_of_search_results'] = result[1]
    jsonfile.writeFile(file, output)
    // console.log(result)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
}

run();
