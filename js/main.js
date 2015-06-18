$( ".check" ).hover(function(){
              $.ajax({
              url: "http://api.wordnik.com:80/v4/word.json/"+$(this).text()+"/relatedWords?useCanonical=true&relationshipTypes=synonym&api_key=7026726c936e0ea32700d53c3c60294e50e5db2f2dab65fc5",
              type: "get",
              success: function(data) {
                if(data[0] != 0) {
                  $("#results").text(data[0][Object.keys(data[0])[1]].join(""));
                }
              }
            });
});