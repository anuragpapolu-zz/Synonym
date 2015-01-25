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
  var bad_words = ["all", "another", "and", "any", "anybody", "anyone", "anything", "a", "both", "but", "each", "either", "everybody", "everyone", "everything", "few", "for", "he", "her", "herself", "hers", "him", "himself", "his","how", "I", "it", "itself", "its", "it’s", "many", "me", "mine", "more", "most", "much", "myself", "neither", "no one", "nobody", "none", "nothing","nor", "one", "one another","or", "other", "others", "ours", "ourselves", "several", "she", "so", "some", "somebody", "someone", "something", "that", "their",  "theirs", "them", "themselves", "these", "this", "they", "those", "to", "us", "we", "what", "whatever", "when", "which", "whichever", "who", "whoever", "whom", "whomever", "whose", "you", "your", "yours", "yourself", "yourselves", "yet", "back", "in", "the", "of", "our", "ours", "just", "on", "as","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety","hundred","thousand","million","billion","trillion","million"];
  $.each(word, function(index, value){
    if(isInArray(value, bad_words) > -1) {
      alert(index+ "is a bad word");
    } else {
      alert(value + "isn't a bad word");
    }
  });
  console.log(words);
  var wordarray = $(".wrapper").text().split(" ");
  $.each(wordarray, function(index, value){
    if(isInArray(value, words) > -1) {
      wordarray[index] = "<a href='#"+value+"' class='label label-warning'>"+value+"</a>";
      words.splice([isInArray(value, words)]);

    } 

    
  });
  $(".wrapper").html(wordarray.join(" "));

}
$(".btn").click(function(){
  makeCorsRequest($(".wrapper").text().split(" "));
});
