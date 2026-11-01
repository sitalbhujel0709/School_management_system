"use client";

import API_INSTANCE from "@/lib/axios/axios";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const page = () => {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const transaction_uuid = uuidv4();
      const formData = {
        amount: amount,
        failure_url: "http://localhost:3000/failure",
        product_delivery_charge: "0",
        product_service_charge: "0",
        product_code: "EPAYTEST",
        signature: "",
        signed_field_names: "total_amount,transaction_uuid,product_code",
        success_url: "http://localhost:3000/success",
        tax_amount: "0",
        total_amount: amount,
        transaction_uuid: transaction_uuid,
      };

      const response = await API_INSTANCE.post("/payments/signature", {
        total_amount: formData.total_amount,
        transaction_uuid: formData.transaction_uuid,
        product_code: formData.product_code,
      });
      const { signature } = response.data;

      formData.signature = signature;

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

      Object.entries(formData).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value as string;
        form.appendChild(input);
      });

      console.log(form);

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    
      <div className="bg-gray-100 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Payment</h1>
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-gray-700 font-medium mb-2"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <button
            disabled={loading}
            onClick={handlePayment}
            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
  );
};

export default page;
