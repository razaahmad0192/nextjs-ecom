import { otpEmail } from "@/email/otpEmail";
import { connectDB } from "@/lib/databaseConnection";
import { generateOTP, response } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/Otp.model";
import UserModel from "@/models/User.model";

export async function POST(req) {
    try {
        await connectDB();
        const payload = await req.json();
        const validationSchema = zSchema.pick({
            email: true
        });
        const validatedData = validationSchema.safeParse(payload)
        if (!validatedData.success) {
            return response(false, 400, "Validation Error", validatedData.error)
        }
        const { email } = validatedData.data;

        const getUser = await UserModel.findOne({ deletedAt: null, email })
        if (!getUser) {
            return response(false, 400, "User not found.")
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
        return response(false, 500, "Internal Server Error", error.message)
    }
}