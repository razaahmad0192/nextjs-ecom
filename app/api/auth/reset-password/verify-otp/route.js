import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/Otp.model";
import UserModel from "@/models/User.model";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function POST(request) {
    try {
        await connectDB();
        const payload = await request.json();
        const validationSchema = zSchema.pick({
            email: true,
            otp: true
        })
        const validatedData = validationSchema.safeParse(payload)
        if (!validatedData.success) {
            return response(false, 400, "Validation Error", validatedData.error)
        }
        const { email, otp } = validatedData.data;

        const getOtpData = await OTPModel.findOne({ email, otp })
        if (!getOtpData) {
            return response(false, 400, "Invalid or expired OTP")
        }



        await OTPModel.deleteMany({ email })//Deleting Old OTPS
        const user = await UserModel.findOne({deletedAt:null, email }).lean()
        if(!user){
            return response(false, 400, "User not found.")
        }
        await getOtpData.deleteOne()//Deleting used OTP
        return response(true, 200, "OTP Verified Successfully" )
    } catch (error) {
        return catchError(error)
    }
}