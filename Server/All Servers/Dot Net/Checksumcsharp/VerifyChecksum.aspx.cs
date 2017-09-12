using System;
using System.Collections.Generic;
using paytm;
using PaytmContant;
using System.Web.Script.Serialization;
public partial class VerifyChecksum : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.Form.AllKeys.Length > 0)
        {
            Dictionary<string, string> parameters = new Dictionary<string, string>();
            try
            {                
                string paytmChecksum = "", responseString = "";
		bool Isvalidate = false;

            	
		foreach (string key in Request.Form.Keys)
           	{
			if (Request.Form[key].ToUpper().Contains("REFUND") || Request.Form[key].Contains("|"))
			{
			    parameters.Add(key.Trim(), "");
			}
			else
			{
			    parameters.Add(key.Trim(), Request.Form[key].Trim());
			}
		}


                if (parameters.ContainsKey("CHECKSUMHASH"))
                {
                    paytmChecksum = parameters["CHECKSUMHASH"];
                    parameters.Remove("CHECKSUMHASH");
                }
				
		Isvalidate = CheckSum.verifyCheckSum(PaytmConstants.MERCHANT_KEY, parameters, paytmChecksum)

		Response.Write(Isvalidate);
            }
            catch (Exception ex)
            {
                Response.Write(ex.Message);
            }
        }
    }
}
