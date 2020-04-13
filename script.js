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


///////get cryptocoin price history by 7day periods and graph it//////

$.ajax({ 
    url: historyQuery,
    method: "GET"
}).then(function (response) {
    
    // Google charts code
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
  
    function drawChart() {

      // Get historical coin data and create an array of arrays
      var histData = response.data.coin.history;
      var arrayOfArrays= [['Month', 'U.S. Dollars']];

      // Create arrays each with two elements and push them into arrayOfArrays
      for (var i = 0; i < histData.length; i++) {
        arrayOfArrays.push([JSON.stringify(i), parseInt(histData[i])]);
      }
      
      // Google charts code. This contains the data to be graphed, namely the arrayOfArrays
      var data = google.visualization.arrayToDataTable(arrayOfArrays);
      
      var options = {
        title: 'Currency Performance',
        curveType: 'none',
        legend: { position: 'bottom' }
      };
  
      var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
      
      chart.draw(data, options);
    }
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

    // Loop through the array and display three articles and images
    for (var i = 0; i < response.articles.length; i++) {

      var title = response.articles[i].title;
      $("#title" + i).text(title);

      var author = response.articles[i].author;
      $("#author" + i).text(author);

      var article = response.articles[i].content;
      $("#article" + i).text(article);

      var url = response.articles[i].url;
      $("#url" + i).html("<a href='" + url + "' target='_blank'><em>Read more...</em></a>");
    
      var image = response.articles[i].urlToImage;
      $("#image" + i).html("<img src = '" + image + "' width='600' alt='image that accompanies the article.'>");

    }
  });
});