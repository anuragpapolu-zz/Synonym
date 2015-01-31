$(document).ready(function(){
	var area = document.getElementById('edit')

	Countable.live(area, function (counter) {
	  $("display_words").text(counter.words);
	  $("display_chars").text(counter.characters);
	  $("display_paragraphs").text(counter.paragraphs);
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

});
