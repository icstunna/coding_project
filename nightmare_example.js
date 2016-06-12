var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });
var jsonfile = require('jsonfile');
var file = './data.json'
var output = new Object();
var scrapeResults = new Array();


function run() {
  nightmare
  .goto('http://google.com')
  .type('form[action="/search"] [name=q]', 'captain 401k')
  .click('form[action="/search"] [type=submit]')
  .wait('#resultStats')
  .evaluate(function (scrapeResults) {
    var titles = new Array;
    scrapeResults.push(document.querySelector('#resultStats').innerHTML); //the number of search results
    titles.push(document.querySelector('.r > a').innerHTML); //the first title is unaccessible otherwise
    var titlesPartTwo = document.querySelector('.srg').children; //this grabs the container of search results
    for (i = 0; i < titlesPartTwo.length; i++) {
      var html = titlesPartTwo[i].children[0].children[0].children[0].innerHTML //this accesses the titles
      titles.push(html)
    }

    scrapeResults.push(titles)
    return scrapeResults
  }, scrapeResults)
  /*********************************************
  This was my attempt to click to page two
  and scrape the second page. While the scrape
  was successful, I cannot determine how to store
  the scraped results unto the 'scrapeResults'
  variable in order to have access to both the
  page one and page two search result titles
  *********************************************/
  // .click('.pn')
  // .wait(1000)
  // .evaluate(function(scrapeResults) {
  //   var titlesPartTwo = document.querySelector('.srg').children; //this grabs the container of search results
  //   for (i = 0; i < titlesPartTwo.length; i++) {
  //     var html = titlesPartTwo[i].children[0].children[0].children[0].innerHTML //this accesses the titles
  //     scrapeResults.push(html)
  //   }
  //   return scrapeResults
  // }, scrapeResults)
  .end()
  .then(function (result) {
    var regex = /\d\d\d,\d\d\d/;
    var resultStats = result[0].match(regex)[0]
    output['number_of_results'] = resultStats
    output['title_of_search_results'] = result[1]
    jsonfile.writeFile(file, output)
    // console.log(result)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
}

run();
