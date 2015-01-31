jQuery.fn.wordCount = function(params)
{
   var p =  {
   counterElement:"display_count"
   };
  &nbsp;var total_words;

  if(params) {
      jQuery.extend(p, params);
  &nbsp;}

  //for each keypress function on text areas
 &nbsp;this.keypress(function()
  {
    total_words=this.value.split(/[\s\.\?]+/).length;
   &nbsp;jQuery('#'+p.counterElement).html(total_words);
  &nbsp;});
};
$(document).ready(function(){
	$('#edit').wordCount();
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
