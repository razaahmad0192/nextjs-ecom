import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import ProductVariantModel from "@/models/ProductVariant.model";
import { sizes } from "@/lib/utils";

export async function GET() {
    try {


        await connectDB() // Connect to MongoDB

        const sizeOrder = new Map(sizes.map((size, index) => [size.value, index]))
        const getSize = await ProductVariantModel.distinct('size', { deletedAt: null })
        const sortedSize = getSize
            .filter(Boolean)
            .sort((left, right) => {
                const leftIndex = sizeOrder.has(left) ? sizeOrder.get(left) : Number.MAX_SAFE_INTEGER
                const rightIndex = sizeOrder.has(right) ? sizeOrder.get(right) : Number.MAX_SAFE_INTEGER

                return leftIndex - rightIndex || left.localeCompare(right)
            })

        if (!sortedSize.length) {
            return response(false, 404, 'Size not found')
        }

        return response(true, 200, 'Size retrieved successfully', sortedSize)
    } catch (error) {
        return catchError(error)

    }
}