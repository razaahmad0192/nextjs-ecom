import Link from 'next/link'
import React from 'react'
import { BiCategory } from 'react-icons/bi'
const CountOverview = () => {
    return (
        <div className='grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-10 gap-5 '>
            <Link href="">
                <div className='flex items-center justify-between p-3 rounded-lg border shadow border-l-4 border-l-green-400 bg-white dark:bg-card dark:border-gray-800 dark:border-l-green-400 '>
                    <div>
                        <h4 className='font-medium text-gray-500'>Total Categories</h4>
                        <span className='text-xl font-bold '>10</span>
                    </div>
                    <div>
                        <span className='w-12 h-12 flex border justify-center items-center rounded-full bg-green-500'> <BiCategory /></span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CountOverview
