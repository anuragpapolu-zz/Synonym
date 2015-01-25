function getTitle(text) {

  var list = text;
  alert(list);
  return list;
}

// Make the actual CORS request.
function makeCorsRequest(word) {
  var results = [];
  $.each(word, function (index, value) {
    var url = 'php/get.php?word='+value;

    $.ajax({  
      type: "POST",  
      url: "some.php",  
      data: { word: word }
    }).done(function( msg ) { 
      var title = getTitle(msg);
      results.push(title);
  
    });
    
  });
  console.log(results);
}

$(".wrapper").bind('input propertychange', function(){
  makeCorsRequest($(this).text().split(" "));
});
