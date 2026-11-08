"use client";
import { useParams } from 'next/navigation';
import React from 'react'

const page = () => {
  const {id} = useParams();
  const teacherId = id as string;
  return (
    <div className='py-8 px-6'>
      {
        teacherId
      }
    </div>
  )
}

export default page