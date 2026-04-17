import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import userIcon from '@/public/assets/images/user.png' 
import { Chip } from "@mui/material"
export const DT_CATEGORY_COLUMN = [
    {
        accessorKey: 'name',
        header: 'Category Name',
    },
    {
        accessorKey: 'slug',
        header: 'Slug',
    },

]
export const DT_PRODUCT_COLUMN = [
    {
        accessorKey: 'name',
        header: 'Product Name',
    },
    {
        accessorKey: 'slug',
        header: 'Slug',
    },
    {
        accessorKey: 'category',
        header: 'Category',
    },
    {
        accessorKey: 'mrp',
        header: 'MRP',
    },
    {
        accessorKey: 'sellingPrice',
        header: 'Selling Price',
    },
    {
        accessorKey: 'discountPercentage',
        header: 'Discount Percentage',
    },
    // {
    //     accessorKey: 'description',
    //     header: 'Description',
    // },

]
export const DT_PRODUCT_VARIANT_COLUMN = [
    {
        accessorKey: 'product',
        header: 'Product Name',
    },
    {
        accessorKey: 'color',
        header: 'Color',
    },
    {
        accessorKey: 'size',
        header: 'Size',
    },
    {
        accessorKey: 'sku',
        header: 'SKU',
    },
    {
        accessorKey: 'mrp',
        header: 'MRP',
    },
    {
        accessorKey: 'sellingPrice',
        header: 'Selling Price',
    },
    {
        accessorKey: 'discountPercentage',
        header: 'Discount Percentage',
    },
    // {
    //     accessorKey: 'description',
    //     header: 'Description',
    // },

]
export const DT_COUPON_COLUMN = [
    {
        accessorKey: 'code',
        header: 'Code',
    },
    {
        accessorKey: 'discountPercentage',
        header: 'Discount Percentage',
    },
    {
        accessorKey: 'minShoppingAmount',
        header: 'Minimum Shopping Amount',
    },
    {
        accessorKey: 'validity',
        header: 'Validity',
        Cell: ({ renderedCellValue }) => (new Date(renderedCellValue).toLocaleDateString())
    }
]
export const DT_CUSTOMER_COLUMN = [
    {
        accessorKey: 'avatar',
        header: 'Avatar',
        Cell: ({ renderedCellValue }) => (
            <Avatar>
               <AvatarImage src={renderedCellValue?.url || "/assets/images/user.png"} alt="Avatar" />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
        )
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'email',
        header: 'Email',
        
    },
    {
        accessorKey: 'phone',
        header: 'Phone',
    },
    {
        accessorKey: 'address',
        header: 'Address',
    },
    {
        accessorKey: 'isEmailVerified',
        header: 'Is Email Verified',
        Cell: ({ renderedCellValue }) => (renderedCellValue ?  <Chip color="success" label="Verified"/> : <Chip color="error" label="Not Verified"/> )
    },

   
]
export const DT_REVIEW_COLUMN = [
    {
        accessorKey: 'product',
        header: 'Product',
    },
    {
        accessorKey: 'user',
        header: 'User',
    },
    {
        accessorKey: 'title',
        header: 'Title',
    },
    {
        accessorKey: 'rating',
        header: 'Rating',
    },
    {
        accessorKey: 'review',
        header: 'Review',
    }

]
export const columnConfig = (column, isCreatedAt = false, isUpdatedAt = false, isDeletedAt = false) => {
    const newColumn = [...column]
    if (isCreatedAt) {
        newColumn.push({
            accessorKey: 'createdAt',
            header: 'Created At',
            Cell: ({ renderedCellValue }) => (new Date(renderedCellValue).toLocaleString())
        })
    }
    if (isUpdatedAt) {
        newColumn.push({
            accessorKey: 'updatedAt',
            header: 'Updated At',
            Cell: ({ renderedCellValue }) => (new Date(renderedCellValue).toLocaleString())
        })
    }
    if (isDeletedAt) {
        newColumn.push({
            accessorKey: 'deletedAt',
            header: 'Deleted At',
            Cell: ({ renderedCellValue }) => (new Date(renderedCellValue).toLocaleString())
        })
    }
    return newColumn
}