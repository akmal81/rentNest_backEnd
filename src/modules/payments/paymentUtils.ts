import axios from "axios";
import config from "../../config";

export const initiatePayment = async (
    rentAmount: number,
    cusName: string,
    cusEmail: string
) => {
    const transId = `TRNX_ID_${Date.now()}`
    const paymentData = {
        store_id: config.ssl_commerz_store_id,
        store_passwd: config.ssl_commerz_store_password,
        total_amount: rentAmount,
        currency: "BDT",
        tran_id: transId,
        success_url: `${config.app_url}/api/payments/confirm?tranId=${transId}&status=success`,
        fail_url: `${config.app_url}/api/payments/confirm?tranId=${transId}&status=fail`,
        cancel_url: `${config.app_url}/api/payments/confirm?tranId=${transId}&status=cancel`,
        cus_name: cusName,
        cus_email: cusEmail,
        cus_add1: "N/A",
        cus_add2: "N/A",
        cus_city: "N/A",
        cus_state: "N/A",
        cus_postcode: 1000,
        cus_country: "Bangladesh",
        cus_phone: "01711111111",
        cus_fax: "01711111111",
    };

    const response = await axios.post(
        "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
        paymentData,
        {
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
    );
    const GatewayPageURL = await response.data.GatewayPageURL;
    console.log(GatewayPageURL);
    return {GatewayPageURL, transId}
};

// 
export const varifyPayment = async (
    payload:Record<string, unknown>
) => {
     const response = await axios.post(
        `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${payload.val_id}&store_id=${config.ssl_commerz_store_id}&store_passwd=${config.ssl_commerz_store_password}&format=json`,
        
        {
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
    ); 

    const data = await response.data
    return {data}
}
