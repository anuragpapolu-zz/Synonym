$(document).ready(function(){
	var area = document.getElementById('edit')

	Countable.live(area, function (counter) {
	  console.log(counter.words)
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
