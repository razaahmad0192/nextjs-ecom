"use client"

import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import ButtonLoading from '@/components/Application/ButtonLoading'
import Editor from '@/components/Application/Admin/Editor'
import Select from '@/components/Application/Select'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import useFetch from '@/hooks/useFetch'
import { showToast } from '@/lib/showToast'
import { zSchema } from '@/lib/zodSchema'
import { ADMIN_DASHBOARD, ADMIN_PRODUCT_SHOW, ADMIN_PRODUCT_VARIANT_SHOW } from '@/routes/AdminPanelRoute'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import slugify from 'slugify'
import MediaModel from '@/components/Application/Admin/MediaModel'
import Image from 'next/image'
import { sizes } from '@/lib/utils'

const breadcrumbData = [
    { href: ADMIN_DASHBOARD, label: 'Home' },
    { href: ADMIN_PRODUCT_VARIANT_SHOW, label: 'Products' },
    { href: '', label: 'Add Product' },
]


const AddProduct = () => {

    // media model states
    const [open, setOpen] = useState(false)
    const [selectedMedia, setSelectedMedia] = useState([])


    const [loading, setLoading] = useState(false)
    const [productOptions, setProductOptions] = useState([])
    const sizeOptions = sizes.map((size) => ({ label: size.label, value: size.value }))
    const { data: getProduct } = useFetch('/api/product?deleteType=SD&&size=10000')

    useEffect(() => {
        if (getProduct && getProduct.success) {
            const productData = getProduct.data
            console.log(productData, "data jee")

            // const variants = 
            const prodOptions = productData.map((product) => ({ label: product.name, value: product._id }))
            setProductOptions(prodOptions)
        }
    }, [getProduct])



    const formSchema = zSchema.pick({
        product: true,
        color: true,
        size: true,
        sku: true,
        mrp: true,
        sellingPrice: true,
        // description: true,
        discountPercentage: true,
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            product: "",
            color: "",
            size: "",
            sku: "",
            mrp: "",
            sellingPrice: "",
            // description: "",
            discountPercentage: "",
        },
    })


    // Calculate discount percentage whenever MRP or Selling Price changes
    useEffect(() => {
        const mrp = form.getValues('mrp') || 0
        const sellingPrice = form.getValues('sellingPrice') || 0

        const discountPercentage = mrp > 0 ? ((mrp - sellingPrice) / mrp) * 100 : 0
        form.setValue('discountPercentage', Math.round(discountPercentage))

    }, [form.watch('mrp'), form.watch('sellingPrice')])



    const onSubmit = async (values) => {
        setLoading(true)
        try {
            if (selectedMedia.length <= 0) {
                return showToast('error', 'Please select at least one media')
            }

            const mediaIds = selectedMedia.map(media => media._id)
            values.media = mediaIds

            const { data: response } = await axios.post('/api/product-variant/create', values)
            if (!response.success) {
                throw new Error(response.message || 'Something went wrong')
            }

            showToast('success', 'Product Variant created successfully')
            form.reset()

        } catch (error) {
            showToast('Error', error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <BreadCrumb breadcrumbData={breadcrumbData} />
            <Card className="py-0 rounded shadow-sm">
                <CardHeader className='pt-3 py-2 px-3 border-b [.border-b]:pb-2'>
                    <h4 className='text-xl font-semibold'>Add Product Variant</h4>
                </CardHeader>
                <CardContent className='pb-5'>
                    <form id="login" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='grid grid-cols-2 gap-5 mb-5'>
                            <Controller
                                name="product"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="product">
                                            Product <span className='text-red-500'>*</span>
                                        </FieldLabel>
                                        <Select
                                            options={productOptions}
                                            selected={field.value}
                                            setSelected={field.onChange}
                                            isMulti={false}
                                            className='w-full'
                                        />

                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="sku"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="sku">
                                            SKU <span className='text-red-500'>*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="sku"
                                            type="text"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter SKU"

                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="color"
                                control={form.control}

                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="color">
                                            Color <span className='text-red-500'>*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            type="text"
                                            id="color"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter Color"

                                        />

                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="size"
                                control={form.control}

                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="size">
                                            Size <span className='text-red-500'>*</span>
                                        </FieldLabel>
                                        <Select
                                            options={sizeOptions}
                                            selected={field.value}
                                            setSelected={field.onChange}
                                            isMulti={false}
                                            className='w-full'
                                        />

                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="mrp"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="mrp">
                                            MRP <span className='text-red-500'>*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            type="number"
                                            id="mrp"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter MRP"

                                        />

                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="sellingPrice"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="sellingPrice">
                                            Selling Price <span className='text-red-500'>*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            type="number"
                                            id="sellingPrice"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter Selling Price"

                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="discountPercentage"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="discountPercentage">
                                            Discount Percentage <span className='text-red-500'>*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            type="number"
                                            readOnly
                                            id="discountPercentage"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter Discount Percentage"

                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>

                        <div className="md:col-span-2 border border-dashed rounded p-5 text-center">
                            <MediaModel
                                open={open}
                                setOpen={setOpen}
                                selectedMedia={selectedMedia}
                                setSelectedMedia={setSelectedMedia}
                                isMultiple={true}
                            />

                            {selectedMedia.length > 0
                                && <div className='flex justify-center items-center flex-wrap mb-3 gap-2'>
                                    {
                                        selectedMedia.map(media => (
                                            <div key={media._id}>
                                                <Image
                                                    src={media.url}
                                                    height={100}
                                                    width={100}
                                                    alt=''
                                                    className='size-full object-cover'
                                                />
                                            </div>
                                        ))}
                                </div>


                            }

                            <div onClick={() => { setOpen(true) }} className='bg-gray-50 dark:bg-card border w-[200px] mx-auto p-5 cursor-pointer'>
                                <span className="font-semibold">Select Media</span>
                            </div>
                        </div>

                        <div className='mt-5'>
                            <ButtonLoading className={' cursor-pointer  '} loading={loading} type="submit" text="Add Product Variant" />
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddProduct

