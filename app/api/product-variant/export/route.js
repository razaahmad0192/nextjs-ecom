import { connectDB } from "@/lib/databaseConnection";
import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
import ProductVariantModel from "@/models/ProductVariant.model";

export async function GET(request) {
    try {
        const auth = await isAuthenticated('admin')
        if(!auth.isAuth){
            return response(false, 403, 'Unauthorized')
        }

        await connectDB() // Connect to MongoDB

     
      
        const filter = {
            deletedAt : null,
        }
        
        const getProductVariant = await ProductVariantModel .find(filter).select('-media -description').sort({createdAt:-1}).lean()

        if(!getProductVariant){
            return response(false, 403, 'Data not found.',getProductVariant)
        } 
        return response(true, 200, 'Data fetched successfully', getProductVariant)

    } catch (error) {
        return catchError(error)

    }
}