import { connectDB } from "@/lib/databaseConnection";
import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import ProductVariantModel from "@/models/ProductVariant.model";

export async function PUT(request) {
    try {
        const auth = await isAuthenticated('admin')
        if (!auth.isAuth) {
            return response(false, 403, 'Unauthorized')
        }

        await connectDB()
        const payload = await request.json()
        const schema = zSchema.pick({
            _id: true,
            product: true,
            color: true,
            size: true,
            sku: true,
            mrp: true,
            sellingPrice: true,
            discountPercentage: true,
            media: true
        })
        const validate = schema.safeParse(payload)
        if (!validate.success) {
            return response(false, 400, 'Invalid or missing fields', validate.error)
        }
        const { _id, product, color, size, sku, mrp, sellingPrice, discountPercentage, media } = validate.data

        const getProductVariant = await ProductVariantModel.findOne({ deletedAt: null, _id })
        if (!getProductVariant) {
            return response(false, 404, 'Product variant not found')
        }
        getProductVariant.product = product
        getProductVariant.color = color
        getProductVariant.size = size
        getProductVariant.sku = sku
        getProductVariant.mrp = mrp
        getProductVariant.sellingPrice = sellingPrice
        getProductVariant.discountPercentage = discountPercentage
        getProductVariant.media = media
        await getProductVariant.save()

        return response(true, 200, 'Product variant updated successfully', getProductVariant)
    } catch (error) {
        return catchError(error)

    }
}