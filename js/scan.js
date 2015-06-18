/* var typingTimer;                //timer identifier
var doneTypingInterval = 500;
document.getElementById("article").addEventListener("input", function() {
    clearTimeout(typingTimer);
     typingTimer = setTimeout(doneTyping, doneTypingInterval);
}, false);

function doneTyping () {
  var content = $("#mimic").html();
  $("#mimic").html($("#article").html());
  $('#mimic').each(function(){
    var text = $(this).html().split(' '),
        len = text.length,
        result = []; 
    for( var i = 0; i < len; i++ ) {
      result[i] = '<span>' + text[i] + '</span>';
    }
    $(this).html(result.join(' '));
  });
  $("#checker").html(content);
}
*/