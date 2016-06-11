var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });
var jsonfile = require('jsonfile');
var file = './data.json'
var output = new Object();



function page1() {
  nightmare
  .goto('http://google.com')
  .type('form[action="/search"] [name=q]', 'captain 401k')
  .click('form[action="/search"] [type=submit]')
  .wait('#resultStats')
  .evaluate(function () {
    var returnList = [];
    var titles = [];
    returnList.push(document.querySelector('#resultStats').innerHTML);
    titles.push(document.querySelector('.r > a').innerHTML); //the first title is unaccessible by conventional means
    var titlesPartTwo = document.querySelector('.srg').children; //this grabs the container for remaining search results
    for (i = 0; i < titlesPartTwo.length; i++) {
      var html = titlesPartTwo[i].children[0].children[0].children[0].innerHTML //this accesses the titles
      titles.push(html)
    }

    returnList.push(titles)
    return returnList
  })
  .click('.pn')
  .evaluate(function() {
    var x = []
    x.push(document.querySelector('.r > a').innerHTML);
    return x
  })
  .end()
  .then(function (result) {
    // var regex = /\d\d\d,\d\d\d/;
    // var intString = result[0].match(regex)[0]
    // output['number_of_results'] = intString
    // output['title_of_search_results'] = result[1]
    // // console.log(output)
    // // var x = JSON.stringify(output)
    // jsonfile.writeFile(file, output, function(err) {
    //   console.log(err)
    // })
    console.log(result)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
}

page1();
