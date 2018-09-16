var http = require('http');
var url = require('url');

var stocks = [];

var next = (function () {
  function nextValue (prev) {
    var r = 2 * Math.random () - 1;
    return prev * (1 + 0.8 * Math.pow (r, 5));
  }

  var prev = {
    index: 0,
    timestamp: new Date ().getTime(),
    stocks: {
      NASDAQ: 40.0,
      CAC40: 145.0
    }
  };

  return function () {
    return prev = {
      timestamp: new Date ().getTime(),
      index: prev.index + 1,
      stocks: Object.keys (prev.stocks).reduce (function (result, key) {
        result[key] = nextValue(prev.stocks[key]);
        return result;
      }, {})
    };
  }
})();

setInterval(function () {
  stocks.push (next ());
}, 1000);

function tail (count) {
  if (count <= 0)
    return stocks;

  if (stocks.length <= count)
    return stocks;

  return stocks.slice (-count);
}

http.createServer(function (request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.writeHead(200, {"Content-Type": "application/json"});
  var query = url.parse(request.url, true).query;
  var count = query.count ? query.count - 0 : 0;
  response.end (JSON.stringify(tail (count)));
}).listen(8000);

console.log("Server running at http://127.0.0.1:8000/");