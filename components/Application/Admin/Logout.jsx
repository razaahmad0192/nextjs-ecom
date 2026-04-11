"use client"

import axios from "axios"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { showToast } from "@/lib/showToast"
import { logout } from "@/store/reducer/authReducer"
import { useRouter } from "next/navigation"
import { LuLogOut } from "react-icons/lu"
import { useDispatch } from "react-redux"

const Logout = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const handleLogout = async () => {
        try {
            const { data: logoutResponse } = await axios.post("/api/auth/logout")

            if (!logoutResponse?.success) {
                throw new Error(logoutResponse?.message || "Logout failed")
            }
            dispatch(logout())
            router.push("/auth/login")
            showToast("success", logoutResponse?.message || "Logout successful")
        } catch (error) {
            showToast("error", error?.response?.data?.message || error?.message || "Logout failed")
        }
    }

    return (
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
            <LuLogOut />
            Logout
        </DropdownMenuItem>
    )
}

export default Logout
