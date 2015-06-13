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
function getTitle(text) {
  var list = eval('(' + text+ ')');
  return list;
}

String.prototype.replaceAll = function(str1, str2, ignore) 
{
  return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 
function isInArray(value, array) {
  return array.indexOf(value);
}
function scan() {
  var text = $("#edit").val();
  var word = text.match(/[\w-']+|[^\w\s]+/g);
  var bad_words = ["all", "another", "own", "be", "and", "any","from", "there","anybody", "anyone", "anything", "a", "both", "but", "each", "can't", "either", "everybody", "everyone", "everything", "are","few", "for", "he", "her", "herself", "hers", "him", "himself", "his","how", "I", "it", "itself", "its", "it’s", "many", "me", "mine", "more", "most", "much", "myself", "neither", "no one", "nobody", "none", "nothing","nor", "one", "one another","or", "other", "others", "ours", "ourselves", "several", "she", "so", "some", "somebody", "someone", "something", "that", "their",  "theirs", "them", "themselves", "these", "this", "they", "those", "to", "us", "we", "what", "whatever", "when", "which", "whichever", "who", "whoever", "whom", "whomever", "whose", "you", "your", "yours", "yourself", "yourselves", "yet", "back", "in", "the", "of", "our", "ours", "just", "on", "as","one","two","three","four","five","six","seven","eight","with","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety","hundred","thousand","million","billion","trillion","million",",",'"',"!","?"];  
  var edit_words = (4*word.length/5);
  console.log(edit_words);
  for (i = 0; i < edit_words; i++) { 
    var randomElementIndex = Math.floor( Math.random() * word.length );
    word.splice(randomElementIndex, 1);
  }
   
  var wordarray = text.match(/[\w-']+|[^\w\s]+/g);
  $.each(wordarray, function(index, value){
    if(isInArray(value, word) > -1 && value.length > 2 && isInArray(value.toLowerCase(), bad_words) == -1) {
      var value = value;
             wordarray[index] = "<a href='#"+value+"' class='ui yellow label'>"+value+"</a>";
            word.splice(isInArray(value, word),1);                  

      var url = 'http://words.bighugelabs.com/api/2/913ccf11d02b6fc55bef17fcaebe89d9/'+value+'/json';
      var xhr = createCORSRequest('GET', url);
      var syns = 0;
      if (!xhr) {
        console.log('CORS not supported');
        return;
      }
        // Response handlers.
        xhr.onload = function() {
          var text = jQuery.parseJSON(JSON.stringify(eval("(" + xhr.responseText + ")")));
          $.each(text, function(idx, obj) {
            $.each(obj.syn, function(index, wordobject){
             syns += 1;
             
            });
          });
          if(syns) {
            console.log(syns); 
          }
          syns = 0;

        };
        xhr.onerror = function() {
          console.log('Woops, there was an error making the request.');
        };
        xhr.send();
      
    } 

    
  });

  var content = wordarray.join(" ");
  $("#wrapper").html(content.replaceAll(' ,', ',').replaceAll(' "', '"').replaceAll(' !', '!').replaceAll(' .', '.').replaceAll(' ?', '? '));
}
$("#start").click(function(){
  $("#form").slideUp();
  scan();
  $("#container").slideDown();
});
