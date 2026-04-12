import { connectDB } from "@/lib/databaseConnection";
import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
import ProductModel from "@/models/Product.model";
import { isValidObjectId } from "mongoose";
import MediaModel from "@/models/Media.model";
export async function GET(request, { params }) {
    try {
        const auth = await isAuthenticated('admin')
        if(!auth.isAuth){
            return response(false, 403, 'Unauthorized')
        }

        await connectDB() // Connect to MongoDB

        const getParams = await params
     
        const id = getParams.id
        const filter = {
            deletedAt : null,
        }
        if(!isValidObjectId(id)){
            return response(false, 400, 'Invalid Object ID')
        }

        filter._id = id

        const getProduct = await ProductModel.findOne(filter).populate('media','_id secure_url').lean()

        if(!getProduct){
            return response(false, 404, 'Product not found')
        }

        return response(true, 200, 'Product retrieved successfully', getProduct)
    } catch (error) {
        return catchError(error)

    }
}