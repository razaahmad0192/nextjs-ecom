"use client"

import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import ButtonLoading from '@/components/Application/ButtonLoading'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { showToast } from '@/lib/showToast'
import { zSchema } from '@/lib/zodSchema'
import { ADMIN_CATEGORY_SHOW, ADMIN_DASHBOARD } from '@/routes/AdminPanelRoute'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import slugify from 'slugify'

const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: 'Home' },
  { href: ADMIN_CATEGORY_SHOW, label: 'Category' },
  { href: '', label: 'Add Category' },
]


const AddCategory = () => {

  const [loading, setLoading] = useState(false)


  const formSchema = zSchema.pick({
    name: true,
    slug: true,
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  })

  useEffect(() => {
    const name = form.getValues('name')

    if (name) {
      form.setValue('slug', slugify(name).toLowerCase())
    }

  }, [form.watch('name')])

  const onSubmit = async (values) => {
    setLoading(true)
    try {

      const { data: response } = await axios.post('/api/category/create', values)
      if (!response.success) {
        throw new Error(response.message || 'Something went wrong')
      }
      showToast('success', 'Category created successfully')
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
          <h4 className='text-xl font-semibold'>Add Category</h4>
        </CardHeader>
        <CardContent className='pb-5'>
          <form id="login" className='flex flex-col gap-5' onSubmit={form.handleSubmit(onSubmit)}>

            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">
                    Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter category name"

                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="slug"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="slug">
                    Slug
                  </FieldLabel>
                  <Input
                    {...field}
                    type="text"
                    id="slug"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter slug"

                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />


            <div>
              <ButtonLoading className={' cursor-pointer'} loading={loading} type="submit" text="Add Category" />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddCategory

