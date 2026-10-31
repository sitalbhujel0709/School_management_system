"use client";
import API_INSTANCE from "@/lib/axios/axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";

const SuccessContent = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = React.useState(true);
  const [transactionData, setTransactionData] = React.useState<{total_amount: number, transaction_uuid: string, product_code: string} | null>(null);

  const dataQuery = searchParams.get("data");
  const router = useRouter();

  useEffect(()=>{
    const fetchData = async ()=>{
      if(dataQuery) {
        try {
          setLoading(true);
          const data = JSON.parse(atob(dataQuery));

          const response= await API_INSTANCE.post("/payments/verify",{
            total_amount:data.total_amount,
            transaction_uuid:data.transaction_uuid,
            product_code:data.product_code,
          })
          const {success,data:responseData} = response.data;
          if(success) {
            setTransactionData(responseData);
          } else {
            router.replace("/failure");
          }

        } catch (error) {
          console.error("Error verifying payment:", error);
          alert("Payment verification failed. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    }
    fetchData()
  },[searchParams])

  if(loading ) {
    return <div>Loading...</div>
  }
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen px-4">
      <div className="bg-white p-8 sm:p-12 rounded-xl shadow-2xl max-w-lg w-full text-center animate-fade-in-scale">
        <div className="mx-auto flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-green-100 mb-6">
          <svg
            className="h-12 w-12 sm:h-16 sm:w-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Thank you for your purchase. Your order is being processed and you
          will receive a confirmation email shortly.
        </p>
        <div>
          <h3>Transaction Details</h3>
          <p>Total Amount: {transactionData?.total_amount}</p>
          <p>Transaction UUID: {transactionData?.transaction_uuid}</p>
          <p>Product Code: {transactionData?.product_code}</p>
        </div>
        
        <Link
          href="/"
          id="manual-redirect-link"
          className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200 underline"
        >
          Go to Dashboard Now
        </Link>
      </div>
    </div>
  );
};

export default SuccessContent;
