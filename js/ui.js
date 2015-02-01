$(document).ready(function(){
	var area = document.getElementById('edit')

	Countable.live(area, function (counter) {
	  $("#display_words").text(counter.words);
	  $("#display_chars").text(counter.characters);
	  $("#display_paragraphs").text(counter.paragraphs);
	});
	$('.dropdown')
	  .dropdown({
	    // you can use any ui transition
	    transition: 'drop'
	  })
	;
	$('.ui.accordion')
	  .accordion()
	;
	$(document).on('click', '#results .content .menu a', function(){ 
	  var value = $(this).attr("href").replace("#","");
	  var replacement = $(this).text();
	  $("#search").val("");
	  $('#wrapper a[href="#'+value+'"]').text(replacement);
	  $('#wrapper a[href="#'+value+'"]').removeClass("yellow").addClass("green");
	  $('#wrapper a[href="#'+value+'"]').attr('href', '#'+replacement);
	  $('.long.modal').modal('hide');
	  $("#results .content .menu .item").slice(1).remove();
	});
	$("#return").click(function(){
	  $("#container").transition('horizontal flip');
	  $("#edit").val($("#wrapper").text());
	  $("#results .content .menu .item").slice(1).remove();
	  $("#form").transition('horizontal flip');
	});
	$("#remove").click(function(){
	  $("#wrapper").text("");
	  $("#edit").val("");
	  $("#display_words").text("0");
	  $("#display_chars").text("0");
	  $("#display_paragraphs").text("0");
	});

	$('#search').on('input', function() { 
	    var filter = new RegExp($(this).val(), "i");

	    $("#results .content .menu a.item").each(function(){
	      if (!$(this).text().match(filter)) {
	        $(this).hide();
	      } else {
	        $(this).show();
	      }
	    });
	});

});
