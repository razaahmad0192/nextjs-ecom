import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import ProductVariantModel from "@/models/ProductVariant.model";

export async function GET() {
    try {


        await connectDB() // Connect to MongoDB

        const getColor = await ProductVariantModel.distinct('color', { deletedAt: null })

        if (!getColor) {
            return response(false, 404, 'Category not found')
        }

        return response(true, 200, 'Category retrieved successfully', getColor)
    } catch (error) {
        return catchError(error)

    }
}