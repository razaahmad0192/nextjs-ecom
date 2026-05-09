
import MainSlider from '@/components/Application/Website/MainSlider'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import banner1 from '@/public/assets/images/banner1.png'
import banner2 from '@/public/assets/images/banner2.png'
import FeaturedProduct from '@/components/Application/Website/FeaturedProduct'
import advertisingBanner from '@/public/assets/images/advertising-banner.png'
import Testimonial from '@/components/Application/Website/Testimonial'
import { BiSupport } from 'react-icons/bi'
import { GiReturnArrow } from 'react-icons/gi'
import { FaShippingFast } from 'react-icons/fa'
import { TbRosetteDiscountFilled } from 'react-icons/tb'


const Home = () => {
  return (
    <>
      <section>
        <MainSlider />
      </section>

      <section className="lg:px-32 px-4 sm:pt-20 pt-5 pb-10">
        <div className="grid grid-cols-2 sm:gap-10 gap-2">
          <div className="border rounded-lg overflow-hidden">
            <Link href="" >
              <Image
                src={banner1}
                alt="Banner 1"
                width={banner1.width}
                height={banner1.height}
                className='transition-all hover:scale-110'
              />
            </Link>
          </div>
          <div className="border rounded-lg overflow-hidden">
            <Link href="" >
              <Image
                src={banner2}
                alt="Banner 2"
                width={banner2.width}
                height={banner2.height}
                className='transition-all hover:scale-110'
              />
            </Link>
          </div>
        </div>
      </section>

      <FeaturedProduct />

      <section className="  sm:pt-20 pt-5 pb-10">
        <Image
          src={advertisingBanner}
          alt="Advertising Banner"
          width={advertisingBanner.width}
          height={advertisingBanner.height}
          className='w-full'
        />
      </section>

      <Testimonial />

      <section className=" lg:px-32 px-4  border-t py-10">
        <div className='grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10 '>
          <div className='text-center'>
            <p className="flex justify-center items-center mb-3">
              <GiReturnArrow size={30} />
            </p>
            <h3 className='text-xl font-semibold'>7-Days Return Policy</h3>
            <p>Risk-free shopping with easy returns.</p>
          </div>
          <div className='text-center'>
            <p className="flex justify-center items-center mb-3">
              <FaShippingFast size={30} />
            </p>
            <h3 className='text-xl font-semibold'>Free Shipping</h3>
            <p>No extra costs, just the price you see.</p>
          </div>
          <div className='text-center'>
            <p className="flex justify-center items-center mb-3">
              <BiSupport size={30} />
            </p>
            <h3 className='text-xl font-semibold'>24/7 Customer Support</h3>
            <p>24/7 support, always here just for you.</p>
          </div>
          <div className='text-center'>
            <p className="flex justify-center items-center mb-3">
              <TbRosetteDiscountFilled size={30} />
            </p>
            <h3 className='text-xl font-semibold'>Member Discounts</h3>
            <p>Special offers just for our loyal customers.</p>
          </div>
        </div>
      </section>

    </>
  )
}

export default Home
