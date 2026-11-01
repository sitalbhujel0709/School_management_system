import PlanCard, { PlanCardProps } from '@/lib/components/plans/PlanCard';
import React from 'react'


const page = () => {
  const plans: PlanCardProps[] = [
    {
      planName: "Pro",
      planCode: "PRO",
      planDescription: "For professionals and small teams",
      planPrice: 2000,
      planFeatures: [
        "Create one School",
        "manage upto 1000 students",
        "Access to all features"
      ]
    },
    {
      planName:"Max",
      planCode: "MAX",
      planDescription: "For large institutions and organizations",
      planPrice: 5000,
      planFeatures: [
        "Create multiple Schools",
        "manage unlimited students",
        "Access to all features"
      ]
    }
  ]
  return (
    <div className="w-full p-12 ">
      <div className="flex flex-col justify-center items-center">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-green-800">Plans you would love</h2>
        </div>
        <div className="w-full flex justify-center items-center gap-4 flex-wrap">
          {plans.map((plan, index) => (
            <PlanCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default page