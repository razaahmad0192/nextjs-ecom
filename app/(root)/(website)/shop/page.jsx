'use client'
import Filter from '@/components/Application/Website/Filter'
import Sorting from '@/components/Application/Website/Sorting'
import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
import { WEBSITE_SHOP } from '@/routes/WebsiteRoute'
import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { RiContactsBookLine } from 'react-icons/ri'
import { useInfiniteQuery } from '@tanstack/react-query'
import ProductBox from '@/components/Application/Website/ProductBox'
import ButtonLoading from '@/components/Application/ButtonLoading'

const breadcrumb = {
  title: "Shop",
  links: [
    { label: 'Shop', href: WEBSITE_SHOP }
  ]
}
const Shop = () => {

  const searchParams = useSearchParams().toString()
  const [limit, setLimit] = useState(9)
  const [sorting, setSorting] = useState('default_sorting')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const fetchProduct = async (pageParam) => {
    const { data: getProduct } = await axios.get(`/api/shop?page=${pageParam}&limit=${limit}&sort=${sorting}&${searchParams}`)

    if (!getProduct.success) return;

    return getProduct.data
  }

  const { error, data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['products', searchParams, limit, sorting],
    queryFn: async ({ pageParam = 0 }) => await fetchProduct(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.nextPage
    }
  })



  return (
    <div>
      <WebsiteBreadcrumb props={breadcrumb} />

      <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
        <SheetContent side="left" className="w-full px-1 sm:w-80">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto max-h-[calc(100vh-80px)]">
            <Filter />
          </div>
        </SheetContent>
      </Sheet>

      <section className='lg:flex lg:items-start lg:gap-6 lg:px-32 px-4 my-20'>
        <div className="hidden lg:block lg:w-72 lg:shrink-0">
          <div className="sticky top-0 bg-gray-50 p-4 w-full rounded">
            <Filter />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="w-full">
            <Sorting
              limit={limit}
              setLimit={setLimit}
              sorting={sorting}
              setSorting={setSorting}
              mobileFilterOpen={mobileFilterOpen}
              setMobileFilterOpen={setMobileFilterOpen}
            />
          </div>
          {isFetching && <div className='p-3 font-semibold text-center'>Loading...</div>}
          {error && <div className='p-3 font-semibold text-center'>{error.message}</div>}

          <div className="grid lg:grid-cols-3 grid-cols-2 lg:gap-10 gap-5">
            {data && data.pages.map(page => (
              page.products.map(product => (
                <ProductBox key={product._id} product={product} />
              )
              )))
            }
          </div>

          {/* LOAD MORE BUTTON */}
          <div className="flex justify-center mt-10">
            {hasNextPage ?
              <ButtonLoading type='button' loading={isFetching} text="Load More" onClick={fetchNextPage} />
              :
              <>
                {!isFetching && <div className='p-3 font-semibold text-center'>No more products to load</div>}
              </>

            }
          </div>
        </div>
      </section>
    </div>
  )
}

export default Shop
