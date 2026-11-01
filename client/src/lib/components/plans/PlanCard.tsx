"use client";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import API_INSTANCE from "@/lib/axios/axios";
export interface PlanCardProps {
  planName: string;
  planCode: "PRO" | "MAX";
  planDescription: string;
  planPrice: number;
  planFeatures: string[];
}

const PlanCard = (data: PlanCardProps) => {
  const [loading, setLoading] = React.useState(false);
  const handlePayment = async () => {
    try {
      setLoading(true);
      const transaction_uuid = uuidv4();
      const formData = {
        amount: data.planPrice as number,
        failure_url: "http://localhost:3000/failure",
        product_delivery_charge: "0",
        product_service_charge: "0",
        product_code: "EPAYTEST",
        signature: "",
        signed_field_names: "total_amount,transaction_uuid,product_code",
        success_url: "http://localhost:3000/success",
        tax_amount: "0",
        total_amount: data.planPrice as number,
        transaction_uuid: transaction_uuid,
      };

      const response = await API_INSTANCE.post("/payments/signature", {
        total_amount: formData.total_amount,
        transaction_uuid: formData.transaction_uuid,
        product_code: formData.product_code,
        planName: data.planCode ,
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
    <div className=" max-w-md w-full bg-white shadow-md p-4">
      <div className="flex flex-col">
        <div className="bg-green-800 text-white px-4 py-2">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">{data.planName}</h2>
            <p className="text-gray-200 text-sm">{data.planDescription}</p>
          </div>
          <div className="flex items-center">
            <span className="text-2xl font-bold">Npr {data.planPrice}</span>
            <div className="ml-2 text-gray-200">
              <p className="text-xs leading-tight">per month</p>
              <p className="text-xs">billed monthly</p>
            </div>
          </div>
          <div className="mt-4">
            <button onClick={handlePayment} disabled={loading} className="w-full bg-white text-green-800 px-4 py-2.5 font-semibold cursor-pointer hover:bg-gray-100">Get {data.planName} Plan</button>
            <p className="text-xs text-center text-gray-200 mt-1">No commitment. Cancel anytime</p>
          </div>
        </div>
        <div className="px-4 py-2">
          <p className="text-green-800 font-semibold">Everything in basic and,</p>
          <ul className="mt-4 space-y-2">
            {
              data.planFeatures.map((feature, index) => (
                <li key={index} className="text-sm text-green-800 border-l-2 border-green-800 pl-2">{feature}</li>
              ))
            }
           
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
