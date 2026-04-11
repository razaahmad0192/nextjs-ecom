import {connectDB} from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import UserModel from "@/models/User.model";
import { jwtVerify } from "jose";



export async function POST (request){
    try {
        await connectDB();

        const {token} = await request.json();
            if(!token){
                return response(false, 400, "Token is required");
            }

            const secret = new TextEncoder().encode(process.env.SECRET_KEY);
            const { payload } = await jwtVerify(token, secret);
            const userId = payload.userId;

            if (!userId) {
                return response(false, 400, "Invalid token payload");
            }
            
            // Find the user by ID and update the email verification status
            const user = await UserModel.findById(userId);
            if (!user) {
                return response(false, 404, "User not found");
            }
            if (user.isEmailVerified) {
                return response(false, 400, "Email is already verified");
            }
            user.isEmailVerified = true;
            await user.save();
            return response(true, 200, "Email verified successfully");
    } catch (error) {
        return catchError(error)
    }
}