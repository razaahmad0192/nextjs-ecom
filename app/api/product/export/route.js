import { connectDB } from "@/lib/databaseConnection";
import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
import ProductModel from "@/models/Product.model";

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
        
        const getProduct = await ProductModel.find(filter).select('-media -description').sort({createdAt:-1}).lean()

        if(!getProduct){
            return response(false, 403, 'Data not found.',getProduct)
        } 
        return response(true, 200, 'Data fetched successfully', getProduct)

    } catch (error) {
        return catchError(error)

    }
}