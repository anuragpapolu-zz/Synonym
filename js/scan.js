var typingTimer;                //timer identifier
var doneTypingInterval = 500;
document.getElementById("article").addEventListener("input", function() {
    clearTimeout(typingTimer);
     typingTimer = setTimeout(doneTyping, doneTypingInterval);
}, false);

var bad_words = ["at", "an","all", "another", "own", "be", "and", "any","from", "there","anybody", "anyone", "anything", "a", "both", "but", "each", "can't", "either", "everybody", "everyone", "everything", "are","few", "for", "he", "her", "herself", "hers", "him", "himself", "his","how", "I", "it", "itself", "its", "it’s", "many", "me", "mine", "more", "most", "much", "myself", "neither", "no one", "nobody", "none", "nothing","nor", "one", "one another","or", "other", "others", "ours", "ourselves", "several", "she", "so", "some", "somebody", "someone", "something", "that", "their",  "theirs", "them", "themselves", "these", "this", "they", "those", "to", "us", "we", "what", "whatever", "when", "which", "whichever", "who", "whoever", "whom", "whomever", "whose", "you", "your", "yours", "yourself", "yourselves", "yet", "back", "in", "the", "of", "our", "ours", "just", "on", "as","one","two","three","four","five","six","seven","eight","with","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety","hundred","thousand","million","billion","trillion","million",",",'"',"!","?"];  

function doneTyping () {
  if($("#checker").text()!=$("#article").text()) {
    var content = $("#mimic").html();
    $("#mimic").html($("#article").html());
    $('#mimic').each(function(){
      var text = $(this).html().split(' '),
          len = text.length,
          result = []; 
      for( var i = 0; i < len; i++ ) {
        result[i] = '<span id="'+i+'">' + text[i] + '</span>';
      }
      $(this).html(result.join(' '));
    });
    $("#checker").html(content);
    $("#checker span").each(function(){
      if($("#mimic #"+$(this).attr('id')).text() == $(this).text()) {
        if($(this).attr('class')!="checked" && $(this).attr('class')!="none") {
          if(jQuery.inArray($(this).text(), bad_words) == -1 && isNaN($(this).text().replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,""))) {
            $.ajax({
              url: "http://api.wordnik.com:80/v4/word.json/"+$(this).text()+"/relatedWords?useCanonical=true&relationshipTypes=synonym&api_key=7026726c936e0ea32700d53c3c60294e50e5db2f2dab65fc5",
              type: "get",

              success: function(data) {
                console.log(data.data);
              }
            });
            
          } else {
            $(this).addClass('none');
          }
        }
      }
    });
      clearTimeout(typingTimer);
       typingTimer = setTimeout(doneTyping, doneTypingInterval);  
  }
}
