import { Request,Response } from "express";
import crypto from "crypto";
import UserPayment from "../../database/models/user_payment.model";
import Subscription from "../../database/models/Subscription.model";

export class PaymentController {

  static async generateSignature(req:Request,res:Response){
    const {total_amount,transaction_uuid,product_code,planName} = req.body;
    const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const signature = crypto.createHmac("sha256", process.env.ESEWA_SECRET_KEY as string).update(hashString).digest("base64");
    const userId = req.user?.id as string;
    const payment = await UserPayment.create({
      userId: userId ,
      amount: total_amount,
      currency: "NRP",
      transactionId: transaction_uuid,
    })
    const subscription = await Subscription.update({plan: planName},{where:{userId: userId}});
    console.log(subscription)
    res.status(200).json({ signature });
  }

  static async verifyPayment(req:Request,res:Response){
    const {total_amount,transaction_uuid,product_code} = req.body;
    const response = await fetch(`https://rc.esewa.com.np/api/epay/transaction/status/?product_code=${product_code}&total_amount=${total_amount}&transaction_uuid=${transaction_uuid}`)
    const result = await response.json();
    console.log(result);
    if(result.status === "COMPLETE"){
      await UserPayment.update({status:"COMPLETED"},{where:{transactionId:transaction_uuid}});
      const startDate = new Date();
      await Subscription.update({status:"ACTIVE", startDate: startDate,endDate: Date.now() + 30 * 24 * 60 * 60 * 1000},{where:{userId:req.user?.id}});
      return res.status(200).json({ success: true, data: result });
    }
    await UserPayment.update({status:"FAILED"},{where:{transactionId:transaction_uuid}});
    await Subscription.update({plan:"BASIC"},{where:{userId:req.user?.id}});
    return res.status(400).json({ success: false, message: "Payment verification failed" });
  }
}