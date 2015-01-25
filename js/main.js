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
function isInArray(value, array) {
  return array.indexOf(value);
}
// Make the actual CORS request.
function makeCorsRequest(word) {
// All HTML5 Rocks properties support CORS.
  var words = $.unique(word.match(/\w+/mg));
  var random = [];

  for(var i=0; i<5; i++) {
      var rn = Math.floor(Math.random() * words.length);
      random.push( words[rn]);
      words.splice(rn, 1);
  }
  var wordarray = $(".wrapper").text().split(" ");
  $.each(wordarray, function(index, value){
    if(isInArray(value, random) > -1) {
      alert("DS");
      random.splice([isInArray(value, random)]);
      wordarray.splice(index);
      value = "<span>"+value+"</span>";
      wordarray.push(value);
    }
    
  });
  $(".wrapper").html(wordarray);

}
$(".btn").click(function(){
  makeCorsRequest($(".wrapper").text());
});
