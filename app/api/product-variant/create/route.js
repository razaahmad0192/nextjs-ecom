import { connectDB } from "@/lib/databaseConnection";
import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import ProductVariant from "@/models/ProductVariant.model";
import { encode } from "entities";

export async function POST(request) {
    try {
        const auth = await isAuthenticated('admin')
        if (!auth.isAuth) {
            return response(false, 403, 'Unauthorized')
        }

        await connectDB()
        const payload = await request.json()
        const schema = zSchema.pick({
            product: true,
            color: true,
            size: true,
            sku: true,
            mrp: true,
            sellingPrice: true,
            discountPercentage: true,
            // description:  true,
            media: true
        })
        const validate = schema.safeParse(payload)
        // console.log(validate)
        if (!validate.success) {
            return response(false, 400, 'Invalid or missing fields', validate.error)
        }
        const { color, size, sku, product, mrp, sellingPrice, discountPercentage, description, media } = validate.data
        const newProductVariant = new ProductVariant({
            product,
            color,
            size,
            sku,
            mrp,
            sellingPrice,
            discountPercentage,
            // description: encode(description),
            media,
        })
        await newProductVariant.save()
        return response(true, 201, 'Product variant added successfully', newProductVariant)
    } catch (error) {
        return catchError(error)

    }
}