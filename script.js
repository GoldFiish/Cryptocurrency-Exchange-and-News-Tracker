///////create ajaxcalls to retrieve info ////////

var apiKey = null;
var cryptCoin =null;
var exchangeCurrency= 'PHP';
var coinID='1'
var exQuery = 'https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,'+exchangeCurrency;
var cryptoQuery = 'https://api.coinranking.com/v1/public/coins'
var historyQuery= 'https://api.coinranking.com/v1/public/coin/'+coinID+'?base=USD&timePeriod=7d'
///////// get exchange rates for coins  ////////

// $.ajax({ 
//     url: exQuery,
//     method: "GET"
// }).then(function (response) {
//     console.log(response);
    
// });

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