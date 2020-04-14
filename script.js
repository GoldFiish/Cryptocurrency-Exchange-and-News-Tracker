// hamburger function
$(document).ready(function () {
  $('.sidenav').sidenav();
});


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
  localStorage.setItem('cryptoInfo', JSON.stringify(result))
  for (let i = 0; i < len; i++) {

    var coinID = result.data.coins[i].id;
    var coinName = result.data.coins[i].name;
    var coinSymbol = result.data.coins[i].symbol;
    var newOption = $('<option>').text(coinSymbol + ' ' + coinName);
    $('#crypto-opt').append(newOption);

  }


});



////////on click to set crypto-currency equal to zero if international currency is being entered //////
$('.currency').on('click', function () {
  $('.cryptocurrency').val('0');
})

////////on click to set international-currency equal to zero if crypto-currency  is being entered //////
$('.cryptocurrency').on('click', function () {
  $('.currency').val('0');
})


////////on click to set crypto-currency equal to zero if international currency is being entered //////
$('.currency').on('click', function () {
  $('.cryptocurrency').val('0');
})

////////on click to set international-currency equal to zero if crypto-currency  is being entered //////
$('.cryptocurrency').on('click', function () {
  $('.currency').val('0');
})


// On-click functiion to get and display news articles
$(".btn").on("click", function (event) {
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
      $("#image" + i).html("<img src = '" + image + "' width='100%' alt='Sorry no image available at this time.'>");

    }
  });




  exchangeCurrency = $('#currency-opt').val();
  localStorage.setItem('currencyName', exchangeCurrency);
  var currencyAmt = $('.currency').val();
  currencyAmt = parseInt(currencyAmt);
  var cryptoCurrencyAmt = $('.cryptocurrency').val();
  cryptoCurrencyAmt = parseInt(cryptoCurrencyAmt);
  var cryptoCurrency = $('#crypto-opt').val();

  exchangeCurrency = exchangeCurrency.slice(0, 3);
  exchangeCurrency = exchangeCurrency.trim();

  cryptoCurrency = cryptoCurrency.slice(0, cryptoCurrency.indexOf(' '));
  cryptoCurrency = cryptoCurrency.trim();

  exQuery = 'https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,' + exchangeCurrency


  $.ajax({
    url: exQuery,
    method: "GET"
  }).then(function (response) {

    var currencyRate = parseFloat(response.rates[exchangeCurrency]).toFixed(3);
    localStorage.setItem('currencyRate', JSON.stringify(currencyRate));
    result = JSON.parse(localStorage.getItem('cryptoInfo'));
    console.log(result);

    for (let i = 0; i < result.data.coins.length; i++) {
      if (result.data.coins[i].symbol === cryptoCurrency) {
        cryptoRate = result.data.coins[i].price;
        localStorage.setItem('cryptoRate', cryptoRate);
        localStorage.setItem('coinID', result.data.coins[i].id);
        break;
      }

    }

    if (cryptoCurrencyAmt === 0 && currencyAmt !== 0) {
    cryptoCurrencyAmt = (currencyAmt / currencyRate / cryptoRate);
    $('.cryptocurrency').val(parseFloat(cryptoCurrencyAmt).toFixed(3));

  } else if (currencyAmt === 0 && cryptoCurrencyAmt !== 0) {
    currencyAmt = cryptoCurrencyAmt * cryptoRate * currencyRate;
    $('.currency').val(parseFloat(currencyAmt).toFixed(3));
  } else {
  

  }

  coinID = localStorage.getItem('coinID'); ///////////getting coinID from localStorage
  historyQuery = 'https://api.coinranking.com/v1/public/coin/' + coinID + '?base=USD&timePeriod=7d'
  $.ajax({
    url: historyQuery,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    // Google charts code
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

      // Get historical coin data and create an array of arrays
      var histData = response.data.coin.history;

      var arrayOfArrays = [['Month', 'U.S. Dollars']];
      arrayOfArrays[0][1] = localStorage.getItem('currencyName');


      // Create arrays each with two elements and push them into arrayOfArrays
      for (var i = 0; i < histData.length; i++) {
        arrayOfArrays.push([JSON.stringify(i), currencyRate * parseFloat(histData[i]).toFixed(3)]);
      }

      // Google charts code. This contains the data to be graphed, namely the arrayOfArrays
      var data = google.visualization.arrayToDataTable(arrayOfArrays);

      var options = {
        title: 'Currency Performance By Week',
        curveType: 'none',
        legend: { position: 'bottom' }
      };

      var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

      chart.draw(data, options);
    }
    $(window).resize(function () {
      drawChart();
    });
  });






















})





















})












