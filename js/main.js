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

String.prototype.replaceAll = function(str1, str2, ignore) 
{
  return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 
function isInArray(value, array) {
  return array.indexOf(value);
}
// Make the actual CORS request.
function makeCorsRequest() {
  var text = $("#edit").val();
  var word = $.trim(text.replaceAll(',', ' , ').replaceAll('"', ' " ').replaceAll('!', ' ! ').replace('.', ' . ').replace('?', ' ? ')).split(" ");
  var bad_words = ["all", "another", "own", "and", "any", "anybody", "anyone", "anything", "a", "both", "but", "each", "can't", "either", "everybody", "everyone", "everything", "few", "for", "he", "her", "herself", "hers", "him", "himself", "his","how", "I", "it", "itself", "its", "it’s", "many", "me", "mine", "more", "most", "much", "myself", "neither", "no one", "nobody", "none", "nothing","nor", "one", "one another","or", "other", "others", "ours", "ourselves", "several", "she", "so", "some", "somebody", "someone", "something", "that", "their",  "theirs", "them", "themselves", "these", "this", "they", "those", "to", "us", "we", "what", "whatever", "when", "which", "whichever", "who", "whoever", "whom", "whomever", "whose", "you", "your", "yours", "yourself", "yourselves", "yet", "back", "in", "the", "of", "our", "ours", "just", "on", "as","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety","hundred","thousand","million","billion","trillion","million",",",'"',"!","?"];
  var i;
  for (i = 0; i < word.length; ++i) {
    if(isInArray(word[i], bad_words) > -1) {
      word.splice(i,1);
    } else if (word[i] == "") {
      word.splice(i,1);
    }
  }
  for (i = 0; i < word.length; ++i) {
    if(isInArray(word[i], bad_words) > -1) {
      word.splice(i,1);
    } else if (word[i] == "") {
      word.splice(i,1);
    }
  }
  var wordarray = $.trim(text.replaceAll(',', ' , ').replaceAll('"', ' " ').replaceAll('!', ' ! ').replace('.', ' . ').replace('?', ' ? ')).split(" ");
  $.each(wordarray, function(index, value){
    if(isInArray(value, word) > -1) {
      wordarray[index] = "<a href='#"+value+"' class='ui yellow label'>"+value+"</a>";
      word.splice(isInArray(value, word),1);

    } 

    
  });
  $("#wrapper").html(wordarray.join(" ").replaceAll(' ,', ', ').replaceAll(' " ', '"').replaceAll(' !', '! ').replace(' .', '. ').replace(' ?', '? '));
}
$("#start").click(function(){
  $("#form").slideUp();
  makeCorsRequest();
  $("#container").slideDown();
});
$(document).on('click', '#wrapper a', function(){ 
  $("#results").html('<div class="ui vertical fluid menu"></div>');
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
          $("#results div").append('<a href="#'+value+'" class="item">'+wordobject+'</a>');
        });
      });
    };
    xhr.onerror = function() {
      console.log('Woops, there was an error making the request.');
    };
    xhr.send();
});
$(document).on('click', '#results a', function(){ 
  var value = $(this).attr("href").replace("#","");
  var replacement = $(this).text();
  $('#wrapper a[href="#'+value+'"]').text(replacement);
  $('#wrapper a[href="#'+value+'"]').removeClass("yellow").addClass("green");
  $('." a[href="#'+value+'"]').attr('href', '#'+replacement);
  $("#results").html('<div class="ui vertical fluid menu"></div>');
});
$("#return").click(function(){
  $("#container").slideUp();
  $("#edit").val($("#wrapper").text());
  $("#form").slideDown();
});
$("#remove").click(function(){
  $("#container").text("");
  $("#edit").val("");

});

