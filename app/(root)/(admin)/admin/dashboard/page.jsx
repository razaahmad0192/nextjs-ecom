import Image from 'next/image'
import React from 'react'
import logoBlack from "@/public/assets/images/logo-black.png"
import logoWhite from "@/public/assets/images/logo-white.png"
import CountOverview from './CountOverview'
const AdminDashboard = () => {
  return (
    <div className='pt-5'>
      <CountOverview />
    </div>
  )
}

export default AdminDashboard
