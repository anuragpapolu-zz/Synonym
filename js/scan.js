var typingTimer;                //timer identifier
var doneTypingInterval = 500;
document.getElementById("article").addEventListener("input", function() {
    clearTimeout(typingTimer);
     typingTimer = setTimeout(doneTyping, doneTypingInterval);
}, false);

function doneTyping () {
    alert("GO");
}
