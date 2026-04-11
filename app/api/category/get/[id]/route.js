import { connectDB } from "@/lib/databaseConnection";
import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
import CategoryModel from "@/models/Category.model";
import { isValidObjectId } from "mongoose";

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
        console.log(filter)
        if(!isValidObjectId(id)){
            return response(false, 400, 'Invalid Object ID')
        }

        filter._id = id

        const getCategory = await CategoryModel.findOne(filter).lean()

        if(!getCategory){
            return response(false, 404, 'Category not found')
        }

        return response(true, 200, 'Category retrieved successfully', getCategory)
    } catch (error) {
        return catchError(error)

    }
}