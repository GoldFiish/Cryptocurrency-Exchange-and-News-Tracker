///////create ajaxcalls to retrieve info ////////

var apiKey = null;
var cryptCoin =null;
var exchangeCurrency= 'PHP';
var coinID=null;
var coinName=null;
var coinSymbol=null;
var coinPrice = null;
var currencyArr=[['CAD', 'CANADIAN DOLLAR'],['HKD','HONK KONG DOLLAR'],['ISK','ICELANDIC KRONA'],['PHP','PHILIPPINE PESO'],['DKK','DANISH KRONA'],['HUF','FUNGARIAN FORINT'],['CZK','CZECH KORUNA'],['GBP','POUND STERLING'],['RON','ROMANIAN LEU'],['SEK','SWEDISH KRONA'],['IDR','INDONESIAN RUPIAH'],['INR','INDIAN RUPEE'],['BRL','BRAZILIAN REAL'],['RUB','RUSSIAN RUBLE'],['HRK','CROATIAN KUNA'],['JPY','JAPANESE YEN'],['THB','THAI BHAT'],['CHF','SWISS FRANC'],['EUR','EURO'],['MYR','MALAYSIAN RINGGIT'],['BGN','BULGARIAN LEV'],['TRY','TURKISH LIRA'],['CNY','CHINESE YUAN'],['NOK','NORWEFIAN KRONE'],['NZD','NEW ZEALAND DOLLAR'],['ZAR','SOUTH AFRICAN RAND'],['USD','UNITED STATES DOLLAR'],['MXN','MEXICAN PESO'],['SGD','SINGAPORE DOLLAR'],['AUD','AUSTRALIAN DOLLAR'],['ILS','ISRAELI NEW SHEKEL'],['KRW','SOUTH KOREAN WON'],['PLN','POLAND ZLOTY']]




var exQuery = 'https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,'+exchangeCurrency;
var cryptoQuery = 'https://api.coinranking.com/v1/public/coins'
var historyQuery= 'https://api.coinranking.com/v1/public/coin/'+coinID+'?base=USD&timePeriod=7d'
/////// get exchange rates for coins  ////////

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
        // console.log(result.data.coins[i].id);
        // console.log(result.data.coins[i].name);
        // console.log(result.data.coins[i].symbol);

      var coindID = result.data.coins[i].id;
      var coinName = result.data.coins[i].name;
      var coinSymbol = result.data.coins[i].symbol;

      var newOption = $('<option>').text(coinName+' '+coinSymbol);
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
});