import { connectDB } from "@/lib/databaseConnection";
import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import CouponModel from "@/models/Coupon.model";


export async function PUT(request) {
    try {
        const auth = await isAuthenticated('admin')
        if (!auth.isAuth) {
            return response(false, 403, 'Unauthorized')
        }

        await connectDB()
        const payload = await request.json()
        const schema = zSchema.pick({
            _id: true,
            code: true,
            discountPercentage: true,
            minShoppingAmount: true,
            validity: true
        })
        const validate = schema.safeParse(payload)
        if (!validate.success) {
            return response(false, 400, 'Invalid or missing fields', validate.error)
        }
        const { _id, code, discountPercentage, minShoppingAmount, validity } = validate.data

        const getCoupon = await CouponModel.findOne({ deletedAt: null, _id })
        if (!getCoupon) {
            return response(false, 404, 'Coupon not found')
        }
        getCoupon._id = _id
        getCoupon.code = code
        getCoupon.discountPercentage = discountPercentage
        getCoupon.minShoppingAmount = minShoppingAmount
        getCoupon.validity = validity
        await getCoupon.save()

        return response(true, 201, 'Coupon updated successfully', getCoupon)
    } catch (error) {
        return catchError(error)

    }
}