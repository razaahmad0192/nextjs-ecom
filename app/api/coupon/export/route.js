import { connectDB } from "@/lib/databaseConnection";
import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
import CouponModel from "@/models/Coupon.model";

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
        
        const getCoupon = await CouponModel.find(filter).sort({createdAt:-1}).lean()

        if(!getCoupon){
            return response(false, 403, 'Data not found.',getCoupon)
        } 
        return response(true, 200, 'Data fetched successfully', getCoupon)

    } catch (error) {
        return catchError(error)

    }
}