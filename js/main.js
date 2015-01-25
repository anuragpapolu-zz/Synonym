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
    $.ajax({

      type: 'GET',
      url: url,
      contentType: 'json',
      xhrFields: {
        // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
        // This can be used to set the 'withCredentials' property.
        // Set the value to 'true' if you'd like to pass cookies to the server.
        // If this is enabled, your server must respond with the header
        // 'Access-Control-Allow-Credentials: true'.
        withCredentials: false
      },
      success: function(data) {
          var text = data;
          var title = getTitle(text);
          console.log(title);
      },

    });
  });

}
$(".btn").click(function(){
  makeCorsRequest($(".wrapper").text().split(" "));
});




