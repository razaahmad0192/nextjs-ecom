
import axios from 'axios'
import React from 'react'
import ProductDetails from './ProductDetails'

const ProductPage = async ({ params, searchParams }) => {
    const { slug } = await params
    const { color, size } = await searchParams
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/details/${slug}`

    if (color && size) {
        url += `?color=${color}&size=${size}`
    }

    let getProduct
    try {
        const response = await axios.get(url)
        getProduct = response.data
    } catch (error) {
        if (error?.response?.status === 404) {
            return (
                <div className='flex justify-center items-center py-10 h-75 '>
                    <h1 className='text-4xl font-semibold'>Product not found.</h1>
                </div>
            )
        }
        throw error
    }

    if (!getProduct.success) {
        return (
            <div className='flex justify-center items-center py-10 h-75 '>
                <h1 className='text-4xl font-semibold'>Product not found.</h1>
            </div>
        )
    }
    return (
        <ProductDetails
            product={getProduct?.data?.products}
            variant={getProduct?.data?.variants}
            colors={getProduct?.data?.colors || []}
            sizes={getProduct?.data?.sizes || []}
            reviewCount={getProduct?.data?.reviewCount || 0}
        />
    )
}

export default ProductPage
