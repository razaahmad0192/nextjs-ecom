import { connectDB } from "@/lib/databaseConnection";
import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import ProductModel from "@/models/Product.model";

export async function POST(request) {
    try {
        const auth = await isAuthenticated('admin')
        if (!auth.isAuth) {
            return response(false, 403, 'Unauthorized')
        }

        await connectDB()
        const payload = await request.json()
        const schema = zSchema.pick({
            name: true,
            slug: true,
            category: true,
            mrp: true,
            sellingPrice: true,
            discountPercentage: true,
            description: true,
            media: true
        })
        const validate = schema.safeParse(payload)
        if (!validate.success) {
            return response(false, 400, 'Invalid or missing fields', validate.error)
        }
        const { name, slug, category, mrp, sellingPrice, discountPercentage, description, media } = validate.data
        const newProduct = new ProductModel({
            name,
            slug,
            category,
            mrp,
            sellingPrice,
            discountPercentage,
            description,
            media,
        })
        await newProduct.save()
        return response(true, 201, 'Product created successfully', newProduct)
    } catch (error) {
        return catchError(error)

    }
}