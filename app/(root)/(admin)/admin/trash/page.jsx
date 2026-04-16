'use client'
import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import DatatableWrapper from '@/components/Application/Admin/DatatableWrapper'
import DeleteAction from '@/components/Application/Admin/DeleteAction'
import EditAction from '@/components/Application/Admin/EditAction'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { DT_CATEGORY_COLUMN, DT_COUPON_COLUMN, DT_PRODUCT_COLUMN, DT_PRODUCT_VARIANT_COLUMN, columnConfig } from '@/lib/column'
import { ADMIN_CATEGORY_ADD, ADMIN_CATEGORY_EDIT, ADMIN_CATEGORY_SHOW, ADMIN_DASHBOARD, ADMIN_TRASH } from '@/routes/AdminPanelRoute'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'
const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: 'Home' },
  { href: ADMIN_TRASH, label: 'Trash' },

]

const TRASH_CONFIG = {
  category:{
    title: 'Category Trash',
    columns: DT_CATEGORY_COLUMN,
    fetchUrl: '/api/category?deleteType=PD',
    exportUrl: '/api/category/export',
    deleteUrl: '/api/category/delete',
  },
  product: {
    title: 'Product Trash',
    columns: DT_PRODUCT_COLUMN,
    fetchUrl: '/api/product?deleteType=PD',
    exportUrl: '/api/product/export',
    deleteUrl: '/api/product/delete',
  },
  'product-variant': {
    title: 'Product Variant Trash',
    columns: DT_PRODUCT_VARIANT_COLUMN,
    fetchUrl: '/api/product-variant?deleteType=PD',
    exportUrl: '/api/product-variant/export',
    deleteUrl: '/api/product-variant/delete',
  },
  coupon: {
    title: 'Coupon Trash',
    columns: DT_COUPON_COLUMN,
    fetchUrl: '/api/coupon?deleteType=PD',
    exportUrl: '/api/coupon/export',
    deleteUrl: '/api/coupon/delete',

  }
}
const Trash = () => {


  const searchParams = useSearchParams()
  const trashOf = searchParams.get('trashof')
  const config = TRASH_CONFIG[trashOf]

  const selectedColumns = useMemo(() => config?.columns ?? [], [config])


  const columns = useMemo(() => {
    return columnConfig(selectedColumns, false, false, true)
  }, [selectedColumns])



  const action = useCallback( (row, deleteType, handleDelete)  => {
    return [<DeleteAction key="delete" handleDelete={handleDelete} row={row} deleteType={deleteType} />]
}, [])


return (
  <div>
    {!config && <div>Invalid trash type</div>}
    {config && (
    <>
    <BreadCrumb breadcrumbData={breadcrumbData} />
    <Card className="py-0 rounded shadow-sm gap-0">
      <CardHeader className='pt-3 py-2 px-3 border-b [.border-b]:pb-2'>
        <div className='flex justify-between items-center'>
          <h4 className='text-xl font-semibold'>{config.title}</h4>
        </div>
      </CardHeader>
      <CardContent className='pt-0 px-0'>
        <DatatableWrapper
          queryKey={`${trashOf}-data-deleted`}
          fetchUrl={config.fetchUrl}
          initialPageSize={10}
          columnsConfig={columns}
          exportEndpoint={config.exportUrl}
          deleteEndpoint={config.deleteUrl}
          deleteType="PD"
          // trashView={`${ADMIN_TRASH}?trashof=category`}
          createAction={action}
        />
      </CardContent>
    </Card>
    </>
    )}
  </div>
)
}

export default Trash
