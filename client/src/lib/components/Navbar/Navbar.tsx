"use client"
import { useAppSelector } from '@/lib/store/hooks';
import { Crown } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react'

const Navbar = () => {
  const {user,isUserInitialized} = useAppSelector((state)=> state.auth)
  console.log(user)
  useEffect(()=>{
    if(isUserInitialized){
      console.log(user)
    }
  },[isUserInitialized,user])
  return (
    <nav className="h-16 border-b border-gray-300 w-full shadow-sm px-4">
      <div className="px-4 flex items-center justify-between  h-full">
        <div className="text-lg font-semibold text-green-800">Welcome, {user?.username}</div>
        <div>
          {
            user?.subscription?.plan === "BASIC" ? (
              <Link href="/plans" className="bg-green-800 text-white text-sm px-4 py-2.5 cursor-pointer">Upgrade Plan
              
              <Crown size={18} className="inline-block ml-2" />
              </Link>
            ):(
              <Link href="/plans" className="bg-green-800 text-white text-sm px-4 py-2.5 cursor-pointer hover:bg-green-900">{user?.subscription?.plan}</Link>
            )
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar