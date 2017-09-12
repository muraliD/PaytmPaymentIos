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
if(isset($_REQUEST["ORDER_ID"]) and isset($_REQUEST["CUST_ID"]) and isset($_REQUEST["TXN_AMOUNT"]) and isset($_REQUEST["EMAIL"]) and isset($_REQUEST["MOBILE_NO"])){	
$paramList["MID"] = MID; //Provided by Paytm
$paramList["ORDER_ID"] = $_REQUEST["ORDER_ID"];//unique OrderId for every request
$paramList["CUST_ID"] = $_REQUEST["CUST_ID"]; // unique customer identifier 
$paramList["INDUSTRY_TYPE_ID"] = INDUSTRY_TYPE_ID; //Provided by Paytm
$paramList["CHANNEL_ID"] = CHANNEL_ID; //Provided by Paytm
$paramList["TXN_AMOUNT"] = $_REQUEST["TXN_AMOUNT"]; // transaction amount
$paramList["WEBSITE"] = WEBSITE_STAGING;//Provided by Paytm
$paramList["CALLBACK_URL"] = CALLBACK_URL;//Provided by Paytm
$paramList["EMAIL"] = $_REQUEST["EMAIL"]; // customer email id
$paramList["MOBILE_NO"] = $_REQUEST["MOBILE_NO"]; // customer 10 digit mobile no.
$checkSum = getChecksumFromArray($paramList,PAYTM_MERCHANT_KEY);
$paramList["CHECKSUMHASH"] = $checkSum;
$paramList["status"] = 'success';
}else{
	$paramList["status"] = 'fail';
	$paramList["error"] = 'check your Paytm payment options';
}
$myJSON = json_encode($paramList,JSON_UNESCAPED_UNICODE);
print_r($myJSON);  

?>
