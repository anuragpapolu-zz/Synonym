
// Make the actual CORS request.
function makeCorsRequest(word) {
  var results = [];
  $.each(word, function (index, value) {

    $.ajax({  
      type: "GET",  
      url: "php/get.php",  
      data: { word: word },
      dataType : 'json',
    }).done(function( msg ) { 
      results.push(msg);
  
    });
    
  });
  console.log(results);
}

$(".wrapper").bind('input propertychange', function(){
  makeCorsRequest($(this).text().split(" "));
});
