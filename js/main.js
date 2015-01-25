
// Make the actual CORS request.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
  // All HTML5 Rocks properties support CORS.


  var results = [];
  $.each(word, function (index, value) {
    var url = "http://words.bighugelabs.com/api/2/913ccf11d02b6fc55bef17fcaebe89d9/"+word+"/json/";
    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
      alert('CORS not supported');
      return;
    }
    xhr.onload = function() {
      var text = xhr.responseText;
      results.push(text);
    };

    xhr.onerror = function() {
      alert('Woops, there was an error making the request.');
    };

    xhr.send();    
  });

  console.log(results);
  // Response handlers.

}

$(".wrapper").bind('input propertychange', function(){
  makeCorsRequest($(this).text().split(" "));
});
