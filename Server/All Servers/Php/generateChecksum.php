<?php
header("Pragma: no-cache");
header("Cache-Control: no-cache");
header("Expires: 0");
// following files need to be included
require_once("./lib/config_paytm.php");
require_once("./lib/encdec_paytm.php");
$checkSum = "";

// below code snippet is mandatory, so that no one can use your checksumgeneration url for other purpose .

$paramList = array();

$paramList["MID"] = 'GOLDSL30257208217900'; //Provided by Paytm
$paramList["ORDER_ID"] = 'ORDER0000001'; //unique OrderId for every request
$paramList["CUST_ID"] = 'CUST00001'; // unique customer identifier 
$paramList["INDUSTRY_TYPE_ID"] = 'Retail'; //Provided by Paytm
$paramList["CHANNEL_ID"] = 'WAP'; //Provided by Paytm
$paramList["TXN_AMOUNT"] = '1.00'; // transaction amount
$paramList["WEBSITE"] = 'goldslamsports.com';//Provided by Paytm
$paramList["CALLBACK_URL"] = 'https://pguat.paytm.com/paytmchecksum/paytmCallback.jsp';//Provided by Paytm
$paramList["EMAIL"] = 'abc@gmail.com'; // customer email id
$paramList["MOBILE_NO"] = '9999999999'; // customer 10 digit mobile no.

$checkSum = getChecksumFromArray($paramList,PAYTM_MERCHANT_KEY);
$paramList["CHECKSUMHASH"] = $checkSum;

print_r($paramList);

?>
