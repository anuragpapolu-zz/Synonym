$('body').keyup(function(e){
   if(e.keyCode == 32){
    $("#article").append('</i><i>');
   }
});