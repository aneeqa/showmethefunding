<?php
$postcode = $_get["postcode"];
echo file_get_contents("http://uk-postcodes.com/postcode/".$postcode.".json");