import { connectDB } from "@/lib/databaseConnection";
import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import CouponModel from "@/models/Coupon.model";

export async function POST(request) {
    try {
        const auth = await isAuthenticated('admin')
        if (!auth.isAuth) {
            return response(false, 403, 'Unauthorized')
        }

        await connectDB()
        const payload = await request.json()
        const schema = zSchema.pick({
            code: true,
            discountPercentage: true,
            minShoppingAmount: true,
            validity: true
        })
       
        const validate = schema.safeParse(payload)
        if (!validate.success) {
            return response(false, 400, 'Invalid or missing fields', validate.error)
        }
        const { code, discountPercentage, minShoppingAmount, validity } = validate.data
        const newCoupon = new CouponModel({
            
            code,
            discountPercentage,
            minShoppingAmount,
            validity
        })
        await newCoupon.save()
        return response(true, 201, 'Coupon created successfully', newCoupon)
    } catch (error) {
        return catchError(error)

    }
}