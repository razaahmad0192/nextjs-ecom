import { connectDB } from "@/lib/databaseConnection";
import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
import ProductModel from "@/models/Product.model";
import { isValidObjectId } from "mongoose";
import MediaModel from "@/models/Media.model";
import ProductVariantModel from "@/models/ProductVariant.model";
import ReviewModel from "@/models/Review.model";
import { colors } from "@mui/material";
export async function GET(request, { params }) {
    try {

        await connectDB() // Connect to MongoDB

        const getParams = await params
        const slug = getParams.slug

        const searchParams = request.nextUrl.searchParams

        const color = searchParams.get('color') || null
        const size = searchParams.get('size') || null

        const filter = {
            deletedAt: null,
        }

        if (!slug) {
            return response(false, 400, 'Product not found.')
        }

        filter.slug = slug

        const getProduct = await ProductModel.findOne(filter).populate('media', 'secure_url').lean()
        if (!getProduct) {
            return response(false, 404, 'Product not found.')
        }

        // get product variants based on color and size
        let variantFilter = {
            product: getProduct._id,
            deletedAt: null,
        }

        if (size) variantFilter.size = size
        if (color) variantFilter.color = color

        let variant = await ProductVariantModel.findOne(variantFilter).populate('media', 'secure_url').lean()
        if (!variant) {
            variant = await ProductVariantModel.findOne({
                product: getProduct._id,
                deletedAt: null,
            }).populate('media', 'secure_url').lean()
        }


        const getColor = await ProductVariantModel.distinct('color', { product: getProduct._id, deletedAt: null })
        const getSize = await ProductVariantModel.aggregate([
            { $match: { product: getProduct._id, deletedAt: null } },
            { $sort: { _id: 1 } },
            {
                $group: {
                    _id: '$size',
                    first: { $first: '$_id' }
                }
            },
            { $sort: { first: 1 } },
            { $project: { _id: 0, size: "$_id" } }
        ])

        // get review
        const review = await ReviewModel.countDocuments({ product: getProduct._id })

        const productData = {
            products: getProduct,
            variants: variant,
            colors: getColor,
            sizes: getSize.length > 0 ? getSize.map(s => s.size) : [],
        }
        return response(true, 200, 'Product retrieved successfully', productData)
    } catch (error) {
        return catchError(error)

    }
}