import mongoose from "mongoose"

const couponSchema = new mongoose.Schema({
    code:{
       type: String,
       required: true,
       unique: true,
       trim:true 
    },
    discountPercentage:{
       type: Number,
       required: true,
       trim:true 
    },
    minShoppingAmount:{
       type: Number,
       required: true,
    },
    validity:{
       type: Date,
       required: true,
    },

    deletedAt: {
        type: String,
        default: null,
        index:true
    },
   

}, { timestamps: true })

// otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })
const CouponModel = mongoose.models.Coupon || mongoose.model('Coupon',couponSchema, 'coupons')
export default CouponModel





