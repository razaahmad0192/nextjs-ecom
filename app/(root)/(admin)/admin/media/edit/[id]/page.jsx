'use client'
import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import ButtonLoading from '@/components/Application/ButtonLoading'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import useFetch from '@/hooks/useFetch'
import { zSchema } from '@/lib/zodSchema'
import { ADMIN_DASHBOARD, ADMIN_MEDIA_SHOW } from '@/routes/AdminPanelRoute'
import { Form } from '@base-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { use, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import imgPlaceholder from '@/public/assets/images/img-placeholder.webp'
import Image from 'next/image'
import { showToast } from '@/lib/showToast'
import axios from 'axios'

const breadCrumbData = [
  { href: ADMIN_DASHBOARD, label: 'Home' },
  { href: ADMIN_MEDIA_SHOW, label: 'Media' },
  { href: "", label: 'Edit Media' },
]
const EditMedia = ({ params }) => {


  const [loading, setLoading] = useState(false)
  const { id } = use(params)
  const { data: mediaData } = useFetch(`/api/media/get/${id}`)
  // console.log(mediaData)
  const formSchema = zSchema.pick({
    _id: true,
    alt: true,
    title: true,
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      _id: "",
      alt: "",
      title: "",
    },
  })
  useEffect(() => {
    
  if(mediaData && mediaData.success){
    const data = mediaData.data
    form.reset({
      _id: data._id,
      alt: data.alt,
      title: data.title,
    })
  }
  }, [mediaData])
  
  const onSubmit = async (values) => {
    try {
        setLoading(true)
        const { data: response } = await axios.put("/api/media/update", values)
        if (!response.success) {
            throw new Error(response.message)
        }
  
        showToast("success", response.message)

    } catch (error) {
        showToast("error", error.message || "An error occurred while updating media. Please try again.")
    } finally {
        setLoading(false)
    }
  }


  return (
    <div>
      <BreadCrumb breadcrumbData={breadCrumbData} />
      <Card className="py-0 rounded shadow-sm">
        <CardHeader className='pt-3 py-2 px-3 border-b [.border-b]:pb-2'>
          <h4 className='text-xl font-semibold'>Edit Media</h4>
        </CardHeader>
        <CardContent className='pb-5'>
          <form id="login" className='flex flex-col gap-5' onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-5">
              <Image
                src={mediaData?.data?.secure_url || imgPlaceholder}
                width={150}
                height={150}
                alt={mediaData?.data?.alt || "Image"}
              />
            </div>
            <Controller
              name="alt"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="alt">
                    Alt
                  </FieldLabel>
                  <Input
                    {...field}
                    id="alt"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter alt text"

                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">
                    Title
                  </FieldLabel>
                  <Input
                    {...field}
                    type="text"
                    id="title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter title"

                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />


            <div>
              <ButtonLoading className={' cursor-pointer'} loading={loading} type="submit" text="Update Media" />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditMedia
