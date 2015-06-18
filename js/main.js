$('body').on('click', 'a.synonyms', function() {
    $("#checker #"+$(this).parent().attr("id")).text($(this).text);
    $("#trash").html($("#checker").html());
    $("#trash span").each(function() {
    	$(this).contents().unwrap();
    });
    $("article").html($("#trash").html());
});