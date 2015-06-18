var typingTimer;                //timer identifier
var doneTypingInterval = 500;
document.getElementById("article").addEventListener("input", function() {
    clearTimeout(typingTimer);
     typingTimer = setTimeout(doneTyping, doneTypingInterval);
}, false);

function doneTyping () {
  $("#checker").html($("#mimic").html(), function(){
    $("#mimic").html($("#article").html());
  });

  
}
