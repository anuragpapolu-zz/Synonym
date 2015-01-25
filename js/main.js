
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
  var list = eval('(' + text+ ')');
  return list;
}

// Make the actual CORS request.
function makeCorsRequest(word) {
  var results = [];
  $.each(word, function (index, value) {
    var url = 'http://www.dictionaryapi.com/api/v1/references/thesaurus/xml/'+value+'?key=f10db1b0-2697-4971-9302-863a3d90f4c1';

    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
      console.log('CORS not supported');
      return;
    }

    // Response handlers.
    xhr.onload = function() {
      var text = xhr.responseText;
      var title = getTitle(text);
      results.push(title);
      console.log(results);
    };

    xhr.onerror = function() {
      console.log('Woops, there was an error making the request.');
    };

    xhr.send();
  });
}

$(".wrapper").bind('input propertychange', function(){
  makeCorsRequest($(this).text().split(" "));
});
