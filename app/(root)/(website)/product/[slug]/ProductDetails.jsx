'use client'
import React, { useEffect, useState } from 'react'
import { decode } from 'entities'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { WEBSITE_PRODUCT_DETAILS, WEBSITE_SHOP } from '@/routes/WebsiteRoute'
import Link from 'next/link'
import Image from 'next/image'
import imgPlaceholder from '@/public/assets/images/img-placeholder.webp'
import { IoStar } from 'react-icons/io5'
import { HiMinus, HiPlus } from 'react-icons/hi2'
import ButtonLoading from '@/components/Application/ButtonLoading'



const ProductDetails = ({ product, variant, colors, sizes, reviewCount }) => {

  const [qty, setQty] = useState(1)
  const [activeThumb, setActiveThumb] = useState()
  useEffect(() => {
    setActiveThumb(variant?.media[0]?.secure_url)
  }, [variant])

  const handleQty = (actionType) => {
    if (actionType === "inc") {
      setQty(qty + 1)
    } else {
      if (qty > 1) {
        setQty(qty - 1)
      }
    }
  }
  const handleAddToCard = () => { }
  return (
    <div className='lg:px-32 px-4'>
      <div className="my-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={WEBSITE_SHOP}>Product</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={WEBSITE_PRODUCT_DETAILS(product?.slug)}>{product?.name || 'Product'}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="md:flex justify-between items-start lg:gap-10 gap-5 mb-20">
        <div className="md:w-1/2 xl:flex xl:justify-center xl:gap-5 md:sticky md:top-0">
          <div className="xl:order-last xl:mb-0 mb-5 xl:w-[calc(100%-144px)]">
            <Image
              src={activeThumb || imgPlaceholder.src}
              width={650}
              height={650}
              alt={product?.media[0]?.alt || product?.name}
              title={product?.media[0]?.title || product?.name}
              className='max-w-full rounded border'
            />
          </div>
          <div className="flex xl:flex-col items-center xl:gap-5 gap-3 xl:w-36 overflow-auto xl:pb-0 pb-2 max-h-[600px] ">
            {variant?.media?.map((thumb, i) => (
              <Image
                key={i}
                src={thumb?.secure_url || imgPlaceholder.src}
                width={100}
                height={100}
                alt={thumb?.alt || product?.name}
                title={thumb?.title || product?.name}
                className={`md:max-w-full max-w-16 ${thumb.secure_url === activeThumb ? "border-2 border-primary" : "border"} rounded border cursor-pointer`}
                onClick={() => setActiveThumb(thumb?.secure_url)}
              />
            ))}
          </div>
        </div>

        <div className="md:w-1/2 md:mt-0 mt-5">
          <h1 className="text-3xl font-semibold mb-2">
            {product?.name || 'Product Name'}
          </h1>
          <div className="flex items-center gap-1 mb-5">
            {Array.from({ length: 5 }, (_, i) => (
              <IoStar key={i} className="text-yellow-400" />
            ))}
            <span className="text-sm">({reviewCount} Reviews)</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className='text-xl font-semibold'>{variant?.sellingPrice.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}</span>
            <span className='text-sm text-gray-500 line-through'>{variant?.mrp.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })}</span>
            <span className=' bg-red-500 rounded-2xl px-3 py-1 text-white text-xs'>-{variant?.discountPercentage?.toFixed(0)}% OFF</span>
          </div>

          <div className='line-clamp-3' dangerouslySetInnerHTML={{ __html: decode(product?.description || '') }}></div>

          <div className='mt-5'>
            <p className='mb-2'><span className='font-semibold'>Color: </span>{variant?.color}</p>
            <div className='flex gap-5 '>
              {
                colors.map(color => (
                  <Link href={`${WEBSITE_PRODUCT_DETAILS(product.slug)}?color=${color}&size=${variant.size}`}
                    className={`border py-1 px-3 rounded-lg cursor-pointer hover:bg-primary hover:text-white ${color === variant.color ? 'bg-primary text-white' : ''}`}
                    key={color}>{color}</Link>
                ))
              }
            </div>
          </div>
          <div className='mt-5'>
            <p className='mb-2'><span className='font-semibold'>Size: </span>{variant?.size}</p>
            <div className='flex gap-5 '>
              {
                sizes.map(size => (
                  <Link href={`${WEBSITE_PRODUCT_DETAILS(product.slug)}?color=${variant.color}&size=${size}`}
                    className={`border py-1 px-3 rounded-lg cursor-pointer hover:bg-primary hover:text-white ${size === variant.size ? 'bg-primary text-white' : ''}`}
                    key={size}>{size}
                  </Link>
                ))
              }
            </div>
          </div>
          <div className="mt-5">
            <p className="font-bold mb-2">Quantity</p>
            <div className="flex items-center h-10 border w-fit rounded-full">
              <button type="button" className='h-full w-10 flex cursor-pointer justify-center items-center' onClick={() => { handleQty('desc') }}>
                <HiMinus />
              </button>
              <input type='text' value={qty} className='w-14 text-center border-none outline-offset-0' readOnly />
              <button type="button" className='h-full w-10 flex cursor-pointer justify-center items-center' onClick={() => { handleQty('inc') }}>
                <HiPlus />
              </button>
            </div>
          </div>


          <div className="mt-5">
            <ButtonLoading type="button" text="Add to Cart" className='w-full rounded-full py-6 text-base cursor-pointer ' onClick={handleAddToCard} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
