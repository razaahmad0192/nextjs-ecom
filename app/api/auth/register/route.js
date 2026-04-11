import {connectDB} from "@/lib/databaseConnection";
import { response,catchError } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { emailVerificationLink } from "@/email/emailVerificationLink";
import { zSchema } from "@/lib/zodSchema";
import { SignJWT } from "jose";
import UserModel from "@/models/User.model";



export async function POST(request){
    try {
        await connectDB();
        // Validation Schema
        const validationSchema = zSchema.pick({
            name: true, email: true, password: true
        })
        
        const payload = await request.json();
        
        const validatedData = validationSchema.safeParse(payload);
        // console.log("Validated Data:", validatedData?.success); // Debugging log
        // console.log("Validation Errors:", validatedData); // Debugging log
        if(!validatedData.success){
            return response(false, 400, "Validation Error", validatedData.error)
        }

        const {name, email, password} = validatedData.data;

        const checkUser = await UserModel.exists({email});

        if(checkUser){
            return response(false, 400, "Email already exists");
        }

        // New Registration
        const newRegistration = new UserModel({
            name,
            email,
            password,
        })
        await newRegistration.save();


        const secret = new TextEncoder().encode(process.env.SECRET_KEY);
        const token = await new SignJWT({userId: newRegistration._id.toString()})
        .setIssuedAt()
        .setExpirationTime("1h")
        .setProtectedHeader({alg: "HS256"})
        .sign(secret);

        await sendMail('Email Verification From Admin', email, emailVerificationLink(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`));
        return response(true, 201, "Registration successful. Please check your email to verify your account.")

    } catch (error) {
        return catchError(error);
    }
}