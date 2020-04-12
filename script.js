///////create ajaxcalls to retrieve info ////////

var apiKey = null;
var cryptCoin = null;
var exchangeCurrency = 'PHP';
var coinID = null;
var coinName = null;
var coinSymbol = null;
var coinPrice = null;
var currencyArr = [['CAD', 'CANADIAN DOLLAR'], ['HKD', 'HONK KONG DOLLAR'], ['ISK', 'ICELANDIC KRONA'], ['PHP', 'PHILIPPINE PESO'], ['DKK', 'DANISH KRONA'], ['HUF', 'FUNGARIAN FORINT'], ['CZK', 'CZECH KORUNA'], ['GBP', 'POUND STERLING'], ['RON', 'ROMANIAN LEU'], ['SEK', 'SWEDISH KRONA'], ['IDR', 'INDONESIAN RUPIAH'], ['INR', 'INDIAN RUPEE'], ['BRL', 'BRAZILIAN REAL'], ['RUB', 'RUSSIAN RUBLE'], ['HRK', 'CROATIAN KUNA'], ['JPY', 'JAPANESE YEN'], ['THB', 'THAI BHAT'], ['CHF', 'SWISS FRANC'], ['EUR', 'EURO'], ['MYR', 'MALAYSIAN RINGGIT'], ['BGN', 'BULGARIAN LEV'], ['TRY', 'TURKISH LIRA'], ['CNY', 'CHINESE YUAN'], ['NOK', 'NORWEFIAN KRONE'], ['NZD', 'NEW ZEALAND DOLLAR'], ['ZAR', 'SOUTH AFRICAN RAND'], ['USD', 'UNITED STATES DOLLAR'], ['MXN', 'MEXICAN PESO'], ['SGD', 'SINGAPORE DOLLAR'], ['AUD', 'AUSTRALIAN DOLLAR'], ['ILS', 'ISRAELI NEW SHEKEL'], ['KRW', 'SOUTH KOREAN WON'], ['PLN', 'POLAND ZLOTY']]
var cryptoCurrencyArr = [];



var exQuery = 'https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,' + exchangeCurrency;
var cryptoQuery = 'https://api.coinranking.com/v1/public/coins'
var historyQuery = 'https://api.coinranking.com/v1/public/coin/' + coinID + '?base=USD&timePeriod=7d'
/////// get exchange rates for coins  ////////

$.ajax({
  url: exQuery,
  method: "GET"
}).then(function (response) {
  console.log(response);


});



///////// setting international currency dropdown values ////////////////////////////////////
for (let i = 0; i < currencyArr.length; i++) {
  var newCurrency = $('<option>').text(currencyArr[i][0] + ':  ' + currencyArr[i][1]);
  $('#currency-opt').append(newCurrency);

}
///////get cryptocoin pricing base USD  ///////////
$.ajax({
  url: cryptoQuery,
  method: "GET"
}).then(function (response) {
  var result = response;
  var len = result.data.coins.length;
  localStorage.setItem('cryptoInfo',JSON.stringify(result))
  console.log(result)
  for (let i = 0; i < len; i++) {

    var coinID = result.data.coins[i].id;
    var coinName = result.data.coins[i].name;
    var coinSymbol = result.data.coins[i].symbol;
    var newOption = $('<option>').text(coinName + ' ' + coinSymbol);
    $('#crypto-opt').append(newOption);

  }


});

///////get cryptocoin price history by 7day periods//////

// $.ajax({ 
//     url: historyQuery,
//     method: "GET"
// }).then(function (response) {
//     var result =response;
//     console.log(response);
// });


////////on click to set crypto-currency equal to zero if international currency is being entered //////
$('.currency').on('click', function () {
  $('.cryptocurrency').val('0');
})

////////on click to set international-currency equal to zero if crypto-currency  is being entered //////
$('.cryptocurrency').on('click', function () {
  $('.currency').val('0');
})


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
    }
  });




  exchangeCurrency = $('#currency-opt').val();
  var currencyAmt = $('.currency').val();
  currencyAmt=parseInt(currencyAmt);
  var cryptoCurrencyAmt =$('.cryptocurrency').val();
  cryptoCurrencyAmt=parseInt(cryptoCurrencyAmt);
  var cryptoCurrency = $('#crypto-opt').val();

  if (cryptoCurrencyAmt === 0) {
  exchangeCurrency=  exchangeCurrency.slice(0,3);
  exQuery ='https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,' + exchangeCurrency
  
  
  $.ajax({
    url: exQuery,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    var rateConversion = parseFloat(response.rates[Object.keys(response.rates)[0]]).toFixed(3);
      localStorage.setItem('currencyRate',JSON.stringify(rateConversion));
      
  });

  
  } else {

  }










});