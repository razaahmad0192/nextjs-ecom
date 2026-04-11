import { cookies } from "next/headers";
import { NextResponse } from "next/server"
import { jwtVerify } from "jose";

export const response = (success, statusCode, message, data = {}) => {
    return NextResponse.json({
        success,
        message,
        data,
    }, { status: statusCode })
}
export const catchError = (error, customMessage)=>{
    console.error(error);
    // Handling Duplicate Key Error
    if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        return response(false, 400, `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`);
    }


    let errorObj = {}

    if(process.env.NODE_ENV === "development"){
        errorObj = {
            message: error.message,
            error 
        }
    }else{
        errorObj = {
            message: customMessage || "An unexpected error occurred. Please try again later.",
            error
        }
    }
    const statusCode = (error.code >= 200 && error.code <= 599) ? error.code : 500;
    return NextResponse.json({
        success: false,
        ...errorObj
    }, { status: statusCode })
}
export const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  return otp
}

export const isAuthenticated = async (role)=>{
    try {
        const cookieStore = await cookies();
        // console.log("COOKIE STORE", cookieStore.get('access_token'))
        if(!cookieStore.has('access_token')){
            return{
                isAuth:false,
            }
        }
        const access_token = cookieStore.get('access_token')
        const {payload} = await jwtVerify(access_token.value, new TextEncoder().encode(process.env.SECRET_KEY))
        // console.log("PAYLOAD", payload.user.role)
        if(payload.user.role !== role){
            return{
                isAuth:false,
            }
        }
        return{  
            isAuth:true,
            userId:payload.user._id,
        }

    } catch (error) {
        return{
            isAuth:false,
            error
        }
    }
}

export const columnConfig= (column , isCreatedAt = false , isUpdatedAt= false, isDeletedAt = false) =>{
    const newColumn = [...column]
    if(isCreatedAt){
        newColumn.push({
            accessorKey: 'createdAt',
            header: 'Created At',
            Cell:({renderedCellValue}) => (new Date(renderedCellValue).toLocaleString())
        })
    }
    if(isUpdatedAt){
        newColumn.push({
            accessorKey: 'updatedAt',
            header: 'Updated At',
            Cell:({renderedCellValue}) => (new Date(renderedCellValue).toLocaleString())
        })
    }
    if(isDeletedAt){
        newColumn.push({
            accessorKey: 'deletedAt',
            header: 'Deleted At',
            Cell:({renderedCellValue}) => (new Date(renderedCellValue).toLocaleString())
        })
    }
    return newColumn;

}
