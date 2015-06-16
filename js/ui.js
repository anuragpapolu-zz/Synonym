
$(document).ready(function(){
	new Medium({
	    element: document.getElementById('article'),
	    mode: Medium.richMode,
		tags: {
			'horizontalRule': ""

		}
	});
	new Medium({
	    element: document.getElementById('title'),
	    mode: Medium.inlineMode,
	    placeholder: 'Your article'
	});
});
