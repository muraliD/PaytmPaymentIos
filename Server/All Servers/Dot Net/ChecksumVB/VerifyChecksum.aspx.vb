Imports System
Imports paytm
Imports PaytmContant
Imports System.Web.Script.Serialization
Partial Public Class VerifyChecksum
    Inherits System.Web.UI.Page
    Protected Sub Page_Load(ByVal sender As Object, ByVal e As EventArgs)
        If Request.Form.AllKeys.Length > 0 Then
            Dim parameters As New Dictionary(Of String, String)()
            Try
                Dim paytmChecksum As String = "", responseString As String = "" 
				Dim Isvalidate As Bool = false

                For Each key As String In Request.Form.Keys
                    If Request.Form(key).Contains("|") Or Request.Form(key).ToUpper().Contains("REFUND") Then
                        parameters.Add(key.Trim(), "")
                    Else
                        parameters.Add(key.Trim(), Request.Form(key).Trim())
                    End If
                Next

                If parameters.ContainsKey("CHECKSUMHASH") Then
                    paytmChecksum = parameters("CHECKSUMHASH")
                    parameters.Remove("CHECKSUMHASH")
                End If
				
				Isvalidate = CheckSum.verifyCheckSum(PaytmConstants.MERCHANT_KEY, parameters, paytmChecksum)
				Response.Write(Isvalidate)
                
			Catch ex As Exception			                
            End Try
					  
        End If
    End Sub
End Class
