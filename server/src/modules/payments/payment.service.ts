import UserPayment from "../../database/models/user_payment.model";
import { CreatePaymentInput } from "./payment.validator";

export class PaymentService {
  static async createPaymentRecord({
    userId,
    amount,
    currency,
    transactionId,
  }: CreatePaymentInput) {
    {
      const payment = await UserPayment.create({
        userId,
        amount,
        currency,
        transactionId,
      });
      return payment;
    }
  }
}
