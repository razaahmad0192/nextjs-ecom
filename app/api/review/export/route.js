import { connectDB } from "@/lib/databaseConnection";
import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
import ReviewModel from "@/models/Review.model";

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
        
        const getReview = await ReviewModel.find(filter).sort({createdAt:-1}).lean()

        if(!getReview){
            return response(false, 403, 'Data not found.',getReview)
        } 
        return response(true, 200, 'Data fetched successfully', getReview)

    } catch (error) {
        return catchError(error)

    }
}