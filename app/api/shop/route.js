import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import CategoryModel from "@/models/Category.model";
import ProductModel from "@/models/Product.model";


export async function GET(request) {
    try {


        await connectDB() // Connect to MongoDB

        const searchParams = request.nextUrl.searchParams

        // get filters from query params

        const size = searchParams.get('size') || null
        const color = searchParams.get('color') || null
        const minPrice = parseInt(searchParams.get('minPrice')) || 0
        const maxPrice = parseInt(searchParams.get('maxPrice')) || 100000
        const categorySlug = searchParams.get('category') || null
        const search = searchParams.get('q') || null

        // pagination
        const limit = parseInt(searchParams.get('limit')) || 9
        const page = parseInt(searchParams.get('page')) || 0
        const skip = page * limit

        // sorting
        const sortOption = searchParams.get('sort') || 'default_sorting'
        let sortQuery = {}
        switch (sortOption) {
            case 'ascending':
                sortQuery = { name: 1 }
                break;
            case 'descending':
                sortQuery = { name: -1 }
                break;
            case 'price_low_to_high':
                sortQuery = { sellingPrice: 1 }
                break;
            case 'price_high_to_low':
                sortQuery = { sellingPrice: -1 }
                break;
            default:
                sortQuery = { createdAt: -1 }
        }

        // find category by slug
        let categoryId = null
        if (categorySlug) {
            const slugs = categorySlug.split(',')
            const categoryData = await CategoryModel.find({
                deletedAt: null,
                slug: { $in: slugs }
            }).select('_id').lean()

            if (categoryData && categoryData.length > 0) {
                categoryId = categoryData.map(cat => cat._id)
            }
        }

        // match stage
        let matchStage = {}
        if (categoryId) matchStage.category = { $in: categoryId }
        if (search) matchStage.name = { $regex: search, $options: 'i' }

        // aggregation pipeline
        const products = await ProductModel.aggregate([
            { $match: matchStage },
            { $sort: sortQuery },
            { $skip: skip },
            { $limit: limit + 1 },
            {
                $lookup: {
                    from: 'productvariants',
                    localField: '_id',
                    foreignField: 'product',
                    as: 'variants'
                }
            },
            {
                $addFields: {
                    variants: {
                        $filter: {
                            input: '$variants',
                            as: 'variant',
                            cond: {
                                $and: [
                                    size ? { $eq: ['$$variant.size', size] } : { $literal: true },
                                    color ? { $eq: ['$$variant.color', color] } : { $literal: true },
                                    { $gte: ['$$variant.sellingPrice', minPrice] },
                                    { $lte: ['$$variant.sellingPrice', maxPrice] }
                                ]
                            }
                        }
                    }
                }
            },
            {
                $match:{
                    variants: { $ne: [] }
                }
            },
            {
                $lookup: {
                    from: 'medias',
                    localField: 'media',
                    foreignField: '_id',
                    as: 'media'
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    slug: 1,
                    mrp: 1,
                    sellingPrice: 1,
                    discountPercentage: 1,
                    media: { _id: 1, secure_url: 1, alt: 1 },
                    variants: {
                        color: 1,
                        size: 1,
                        mrp: 1,
                        sellingPrice: 1,
                        discountPercentage: 1,
                    }
                }
            }
        ])


        // check if more data exists
        let nextPage = null
        if (products.length > limit) {
            nextPage = page + 1
            products.pop() // remove the extra product
        }

        return response(true, 200, 'Products retrieved successfully', { products, nextPage })
    } catch (error) {
        return catchError(error)

    }
}