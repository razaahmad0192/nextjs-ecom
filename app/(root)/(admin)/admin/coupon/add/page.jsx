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
import { ADMIN_COUPON_SHOW, ADMIN_DASHBOARD, ADMIN_PRODUCT_SHOW } from '@/routes/AdminPanelRoute'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import slugify from 'slugify'
import MediaModel from '@/components/Application/Admin/MediaModel'
import Image from 'next/image'

const breadcrumbData = [
    { href: ADMIN_DASHBOARD, label: 'Home' },
    { href: ADMIN_COUPON_SHOW, label: 'Coupons' },
    { href: '', label: 'Add Coupon' },
]


const AddCoupon = () => {

    const [loading, setLoading] = useState(false)



    const formSchema = zSchema.pick({
        code: true,
        discountPercentage: true,
        minShoppingAmount: true,
        validity: true
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: "",
            discountPercentage: "",
            minShoppingAmount: "",
            validity: "",
        },
    })







    const onSubmit = async (values) => {
        setLoading(true)
        try {



            const { data: response } = await axios.post('/api/coupon/create', values)
            if (!response.success) {
                throw new Error(response.message || 'Something went wrong')
            }

            showToast('success', 'Coupon created successfully')
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
                    <h4 className='text-xl font-semibold'>Add Coupon</h4>
                </CardHeader>
                <CardContent className='pb-5'>
                    <form id="login" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-5 mb-5'>

                            <Controller
                                name="code"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="code">
                                            Code <span className='text-red-500'>*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="code"
                                            type="text"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter code for coupon"

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
                            <Controller
                                name="minShoppingAmount"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="minShoppingAmount">
                                            Minimum Shopping Amount <span className='text-red-500'>*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            type="number"
                                            
                                            id="minShoppingAmount"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter Minimum Shopping Amount"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="validity"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="validity">
                                            Validity <span className='text-red-500'>*</span>
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            type="date"
                                            
                                            id="validity"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Enter Validity"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                        </div>
                        <div className='mt-5'>
                            <ButtonLoading className={' cursor-pointer  '} loading={loading} type="submit" text="Add Coupon" />
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddCoupon

