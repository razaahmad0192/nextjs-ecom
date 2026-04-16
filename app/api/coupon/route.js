import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
import { connectDB } from "@/lib/databaseConnection";
import CouponModel from "@/models/Coupon.model";
import { NextResponse } from "next/server";
export async function GET(request) {
    try {
        const auth = await isAuthenticated('admin')
        if (!auth.isAuth) {
            return response(false, 403, 'Unauthorized')
        }
        await connectDB();

        const searchParams = request.nextUrl.searchParams;


        // Extract query parameters
        const start = parseInt(searchParams.get('start') || 0, 10)
        const size = parseInt(searchParams.get('size') || 10, 10)
        const filters = JSON.parse(searchParams.get('filters') || '[]')
        const globalFilter = searchParams.get('globalFilter') || ""
        const sorting = JSON.parse(searchParams.get('sorting') || '[]')
        const deleteType = searchParams.get('deleteType')

        // Build match query
        // Default to active (non-trashed) data when deleteType is not provided.
        let matchQuery = { deletedAt: null }
        if (deleteType === 'PD') {
            matchQuery = { deletedAt: { $ne: null } }
        }

        // Apply global search
        if (globalFilter) {
            matchQuery['$or'] = [
                { code: { $regex: globalFilter, $options: 'i' } },
                { "categoryData.name": { $regex: globalFilter, $options: 'i' } },
                {
                    $expr: {
                        $regexMatch: {
                            input: { $toString: "$minShoppingAmount" },
                            regex: globalFilter,
                            options: 'i'
                        }
                    }
                },
                {
                    $expr: {
                        $regexMatch: {
                            input: { $toString: "$discountPercentage" },
                            regex: globalFilter,
                            options: 'i'
                        }
                    }
                },
            ]
        }


        // Apply column filters
        filters.forEach((filter) => {
            // Implementation for column filters
            if ( filter.id === 'minShoppingAmount' || filter.id === 'discountPercentage') {
                matchQuery[filter.id] = Number(filter.value)
            } else if(filter.id === 'validity'){
                matchQuery[filter.id] = new Date(filter.value) 
            }
            else {

                matchQuery[filter.id] = { $regex: filter.value, $options: 'i' }
            }
        });


        // Build sort query
        let sortQuery = {}
        sorting.forEach((sort) => {
            sortQuery[sort.id] = sort.desc ? -1 : 1
        }
        )


        // Aggregation pipeline
        const aggregatePipeline = [
            { $match: matchQuery },
            { $sort: Object.keys(sortQuery).length ? sortQuery : { createdAt: -1 } },
            { $skip: start },
            { $limit: size },
            {
                $project: {
                    _id: 1,
                    code: 1,
                    minShoppingAmount: 1,
                    discountPercentage: 1,
                    validity: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    deletedAt: 1
                }
            },
        ]



        // Execute Query
        const getCoupon = await CouponModel.aggregate(aggregatePipeline)

        // Get total count for pagination
        const totalRowCount = await CouponModel.countDocuments(matchQuery)

        return NextResponse.json({
            success: true,
            data: getCoupon,
            meta: { totalRowCount }

        })
    } catch (error) {
        return catchError(error)
    }
}