using System;
using System.Collections.Generic;
using paytm;
using PaytmContant;
public partial class GenerateChecksum : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            Dictionary<string, string> parameters = new Dictionary<string, string>();
            parameters.Add("MID", "xxxxxxx"); //Provided by Paytm
            parameters.Add("ORDER_ID", "ORDER000001"); //unique OrderId for every request
            parameters.Add("CUST_ID", "CUST00001"); // unique customer identifier 
            parameters.Add("CHANNEL_ID", "WAP"); //Provided by Paytm
            parameters.Add("INDUSTRY_TYPE_ID", "xxxxxxx"); //Provided by Paytm
            parameters.Add("WEBSITE", "xxxxxxx"); //Provided by Paytm
            parameters.Add("TXN_AMOUNT", "1.00"); // transaction amount
            parameters.Add("CALLBACK_URL", "https://xxxxxxx.xx/paytmCallback.jsp"); //Provided by Paytm
            parameters.Add("EMAIL", "abc@gmail.com"); // customer email id
            parameters.Add("MOBILE_NO", "9999999999"); // customer 10 digit mobile no.
            string paytmChecksum = "";

            foreach (string key in parameters.Keys)
            {
                if (parameters[key].ToUpper().Contains("REFUND") || parameters[key].ToUpper().Contains("|"))
                {
                    parameters[key] = "";
                }
            }

            paytmChecksum = CheckSum.generateCheckSum(PaytmConstants.MERCHANT_KEY, parameters);
            Response.Write(paytmChecksum);

        }
        catch (Exception ex)
        {
            Response.Write(ex.Message);
        }
    }
}
