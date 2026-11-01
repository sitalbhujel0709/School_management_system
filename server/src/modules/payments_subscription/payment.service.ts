import Subscription from "../../database/models/Subscription.model";
import UserPayment from "../../database/models/user_payment.model";
import { CreatePaymentInput, CreateSubscriptionInput } from "./payment.validator";

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

  static async createSubscriptionRecord(data:CreateSubscriptionInput) {
    const subscription = await Subscription.create(data);
    return subscription;
  }

}
