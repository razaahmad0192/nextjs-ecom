import { connectDB } from "@/lib/databaseConnection";
import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
import CategoryModel from "@/models/Category.model";

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
        
        const getCategory = await CategoryModel.find(filter).sort({createdAt:-1}).lean()

        if(!getCategory){
            return response(false, 403, 'Data not found.',getCategory)
        } 
        return response(true, 200, 'Data fetched successfully', getCategory)

    } catch (error) {
        return catchError(error)

    }
}