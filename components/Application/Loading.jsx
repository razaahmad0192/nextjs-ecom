import React from 'react'
import loading from '@/public/assets/images/loading.svg'
import Image from 'next/image'
function Loading() {
  return (
    <div className="flex items-center justify-center mt-12 w-screen h-screen">

        <Image src={loading} alt="Loading..." height={80} width={80} />
    </div>
  )
}

export default Loading
