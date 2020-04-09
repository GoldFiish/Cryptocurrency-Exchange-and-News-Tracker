///////create ajaxcalls to retrieve info ////////

var apiKey = null;
var cryptCoin =null;
var exchangeCurrency= 'PHP';
var exQuery = 'https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,'+exchangeCurrency;
var cryptoQuery = 'https://api.coinranking.com/v1/public/coins'

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
    console.log(response);
    console.log(response.data.coins.length)
    
});
