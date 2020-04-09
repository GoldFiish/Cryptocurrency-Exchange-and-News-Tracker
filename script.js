// Sample api key, variable for type of currency, and query URL
var apiKey = "33a2934dfaa04b2b817eb3096ee6754e"
var cryptoCurrency = "ethereum";
var queryURL = "https://newsapi.org/v2/everything?q=crypto-AND-" + cryptoCurrency + "&language=en&pageSize=3&sortBy=publishedAt&apiKey=" + apiKey;

// AJAX call to news api
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });