$('body').on('click', 'a.synonyms', function() {
	console.log("D");
    $("#checker").find("#"+$(this).parent().attr("id")).text($(this).text);
    console.log("S");
    $("#trash").html($("#checker").html());
    $("#trash span").each(function() {
    	$(this).contents().unwrap();
    });
    $("article").html($("#trash").html());
});