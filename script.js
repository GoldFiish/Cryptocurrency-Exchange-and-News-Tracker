///////create ajaxcalls to retrieve info ////////

var apiKey = null;
var cryptCoin =null;
var exchangeCurrency= 'PHP';
var coinID='1'
var exQuery = 'https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,'+exchangeCurrency;
var cryptoQuery = 'https://api.coinranking.com/v1/public/coins'
var historyQuery= 'https://api.coinranking.com/v1/public/coin/'+coinID+'?base=USD&timePeriod=7d'
///////// get exchange rates for coins  ////////

$.ajax({ 
    url: exQuery,
    method: "GET"
}).then(function (response) {
    console.log(response);
    
});

///////get cryptocoin pricing base USD  ///////////
$.ajax({ 
    url: cryptoQuery,
    method: "GET"
}).then(function (response) {
    var result =response;
    var len = result.data.coins.length;
    console.log(result)
    for(let i =0; i < len; i++){
        console.log(result.data.coins[i].id);
        console.log(result.data.coins[i].name);
        console.log(result.data.coins[i].symbol);
    }

    
});

///////get cryptocoin price history by 7day periods//////

$.ajax({ 
    url: historyQuery,
    method: "GET"
}).then(function (response) {
    var result =response;
    console.log(response);
});
    
    

    
// On-click functiion to get and display news articles
$("button").on("click", function (event) {
  event.preventDefault();

  var cryptoCurrency = $("#crypto-opt").val();
  var apiKey = "33a2934dfaa04b2b817eb3096ee6754e"
  var queryURL = "https://newsapi.org/v2/everything?q=crypto-AND-" + cryptoCurrency + "&language=en&pageSize=3&sortBy=publishedAt&apiKey=" + apiKey;

  // AJAX call to news api
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    // Loop through the array and display three articles
    for (var i = 0; i < response.articles.length; i++) {

      var title = response.articles[i].title;
      $("#title" + i).text(title);

      var author = response.articles[i].author;
      $("#author" + i).text(author);

      var source = response.articles[i].source.name;
      $("#source" + i).text(source);

      var pubDate = response.articles[i].publishedAt;
      $("#pubDate" + i).text(pubDate);

      var article = response.articles[i].content;
      $("#article" + i).text(article);
    

      var image = response.articles[i].urlToImage;
      $("#image" + i).html("<img src = '" + image + "'>");
      
    
    
    
    
    }
  });
});