<?php

// This function grabs the definition of a word in XML format.
function grab_xml_definition ($word, $ref, $key)
	{	$uri = "http://www.dictionaryapi.com/api/v1/references/" . urlencode($ref) . "/xml/" . 
					urlencode($word) . "?key=" . urlencode($key);
		return $uri;
	};

$xdef = grab_xml_definition($_GET['word'], "thesaurus", "f10db1b0-2697-4971-9302-863a3d90f4c1");

echo $xdef;
?>