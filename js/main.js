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
// All HTML5 Rocks properties support CORS.
  $.each(word, function(index, value){
    var url = 'http://words.bighugelabs.com/api/2/913ccf11d02b6fc55bef17fcaebe89d9/'+value+'/json';
    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
      console.log('CORS not supported');
      return;
    }
    // Response handlers.
    xhr.onload = function() {
      var text = xhr.responseText;
      var title = getTitle(text);
      console.log(title);
    };
    xhr.onerror = function() {
      console.log('Woops, there was an error making the request.');
    };
    xhr.send();
  });

}
$(".btn").click(function(){
  var s = document.createElement("script");
  s.src = "http://thesaurus.altervista.org/service.php?word=peace&language=en_US&output=json&key=test_only&callback=process"; // NOTE: replace test_only with your own KEY
  document.getElementsByTagName("head")[0].appendChild(s);

  function process(result) {
    output = "";
    for (key in result.response) {
      list = result.response[key].list;
      output += list.synonyms+"<br>";
    }
    if (output)
      document.getElementById("results").innerHTML = output;
  }

});
