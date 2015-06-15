$('body').keyup(function(e){
   if(e.keyCode == 32){
      $("#article").each(function() {
          var html = $(this).html().split(" ");
          var newhtml = [];

          for(var i=0; i< html.length; i++) {

              if(i>0 && (i%2) == 0)
                  newhtml.push("</i><i>");

              newhtml.push(html[i]);
          }

          $(this).html("<i>"+ newhtml.join(" ") +"</i>");
      });
   }
});