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
// Make the actual CORS request.

$(document).on('click', '#wrapper a', function(){ 
  $("#results .content .menu .item").slice(1).remove();
  var value = $(this).attr("href").replace("#","");
  var url = 'http://words.bighugelabs.com/api/2/913ccf11d02b6fc55bef17fcaebe89d9/'+value+'/json';
  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    console.log('CORS not supported');
    return;
  }
    // Response handlers.
    xhr.onload = function() {
      var text = jQuery.parseJSON(JSON.stringify(eval("(" + xhr.responseText + ")")));
      $.each(text, function(idx, obj) {
        $.each(obj.syn, function(index, wordobject){
          $("#results .content .menu").append('<a href="#'+value+'" class="item">'+wordobject+'</a>');
        });
      });
    };
    xhr.onerror = function() {
      console.log('Woops, there was an error making the request.');
    };
    xhr.send();
    $('.long.modal')
      .modal('show')
    ;
});
