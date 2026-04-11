import { otpEmail } from "@/email/otpEmail";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, generateOTP, response } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/Otp.model";
import UserModel from "@/models/User.model";

export async function POST(request) {
    try {
        await connectDB();
        const payload  = await request.json()
        const validationSchema = zSchema.pick({
            email: true
        })

        const validatedData = validationSchema.safeParse(payload)
        // console.log("validatedData", validatedData)
        if(!validatedData.success)
        {
            return response(false, 401, "Invalid email format or missing input.",validatedData.error)
        }
        const { email }= validatedData.data
        const getUser = await UserModel.findOne({deletedAt:null, email}).lean()
        if(!getUser){
            return response(false, 404, "No user found with the provided email.")
        }
         //Remove old OTPs
        await OTPModel.deleteMany({
            email
        })
        const Otp = generateOTP();
        // Storing otp into database
        const newOtpData = new OTPModel({
            email, otp: Otp
        })
        await newOtpData.save()
        const otpSendStatus =  await sendMail('Your OTP for Login', email, otpEmail(Otp))
        if(!otpSendStatus){
                return response(false, 500, "Failed to resend OTP email. Please try again.")
        } 
        return response(true, 200, "OTP resent successfully")
    } catch (error) {
         return  catchError(error)
    }
}