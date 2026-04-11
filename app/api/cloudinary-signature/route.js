 import { NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"

export async function POST(request){
    try {
        const payload = await request.json()
        // console.log("SIGN PALOD",payload)
        const {paramsToSign} = payload
        const signature =  cloudinary.utils.api_sign_request(paramsToSign, process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET)

        return NextResponse.json({success:true, signature})
    } catch (error) {
        console.error("Error generating signature:", error)
        return NextResponse.json({success:false, error: error.message})
    }
}