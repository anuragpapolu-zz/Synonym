var typingTimer;                //timer identifier
var doneTypingInterval = 500;

document.getElementById("article").addEventListener("input", function() {
    $("#checker").css("margin-top", "-"+$("#article").height()+"px");
    clearTimeout(typingTimer);
     typingTimer = setTimeout(doneTyping, doneTypingInterval);
     
}, false);

var bad_words = ["at", "an","all", "another", "own", "be", "and", "any","from", "there","anybody", "anyone", "anything", "a", "both", "but", "each", "can't", "either", "everybody", "everyone", "everything", "are","few", "for", "he", "her", "herself", "hers", "him", "himself", "his","how", "I", "it", "itself", "its", "it’s", "many", "me", "mine", "more", "most", "much", "myself", "neither", "no one", "nobody", "none", "nothing","nor", "one", "one another","or", "other", "others", "ours", "ourselves", "several", "she", "so", "some", "somebody", "someone", "something", "that", "their",  "theirs", "them", "themselves", "these", "this", "they", "those", "to", "us", "we", "what", "whatever", "when", "which", "whichever", "who", "whoever", "whom", "whomever", "whose", "you", "your", "yours", "yourself", "yourselves", "yet", "back", "in", "the", "of", "our", "ours", "just", "on", "as","one","two","three","four","five","six","seven","eight","with","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety","hundred","thousand","million","billion","trillion","million",",",'"',"!","?"];  

function doneTyping () {
  if($("#checker").text()!=$("#article").text()) {
    syno();
  }
}

function syno () {

    var content = $("#mimic").html();
    var words = $("#article").html().split(" ");
    var newcontent = [];
    $.each(words, function(i, v) {
        newcontent.push('<span id="'+i+'">'+v+'</span>');
    });
     console.log(newcontent);
    $("#mimic").html(newcontent.join(" "));
    $("#checker").html(content);
    $('.ui.accordion').html("");
    $("#checker span").each(function(){
      var id = $(this).attr('id');
      var text = $(this).text();
      if($("#mimic #"+$(this).attr('id')).text() == $(this).text()) {
        if($(this).attr('class')!="checked" && $(this).attr('class')!="none") {
          if(jQuery.inArray($(this).text(), bad_words) == -1 && isNaN($(this).text().replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,""))) {
            $.ajax({
              url: "http://api.wordnik.com:80/v4/word.json/"+$(this).text()+"/relatedWords?useCanonical=true&relationshipTypes=synonym&api_key=7026726c936e0ea32700d53c3c60294e50e5db2f2dab65fc5",
              type: "get",
              success: function(data) {
                if(data.length != 0) {
                  $("#checker #"+id).addClass('checked');
                  $(".accordion").append('<div class="title">'+text+'</div><div id="'+id+'"class="content ui list"></div>');
                  for (var i = data[0].words.length - 1; i >= 0; i--) {
                    $("#results #"+id).append("<a class='item synonyms'>"+data[0].words[i]+"</a>");
                  };
                  
                  $('.ui.accordion')
                    .accordion()
                  ;
                  $(".ui.accordion .title:first").addClass('active');
                  $(".ui.accordion .content:first").addClass('active');

                }
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
$(document).on("mouseenter", "a.synonyms", function() {
    $("#checker").find("#"+$(this).parent().attr("id")).css('background','#f1c40f');
});

$(document).on("mouseleave", "a.synonyms", function() {
    $("#checker").find("#"+$(this).parent().attr("id")).css('background','transparent');
});


$(document).on('click', 'a.synonyms', function() {
    $("#checker").find("#"+$(this).parent().attr("id")).text($(this).text());
    $("#trash").html($("#checker").html());
    $("#trash span").each(function() {
      $(this).contents().unwrap();
    });
    $("#article").html($("#trash").html());
    console.log("a");
    syno();
    console.log("b");
     
});

