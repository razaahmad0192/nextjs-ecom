"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar } from "@base-ui/react/avatar"
import { useSelector } from "react-redux"
import Link from "next/link"
import { IoShirtOutline } from "react-icons/io5"
import { MdOutlineShoppingBag } from "react-icons/md"
import Logout from "./Logout"



const UserDropdown = () => {
    const auth = useSelector((store) => store.authStore.auth)
    const avatarSrc = auth?.avatar || "/assets/images/user.png"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar.Root>
                    <Avatar.Image width={30} height={30} src={avatarSrc} alt={auth?.name || "Admin Logo"} />
                </Avatar.Root>
            </DropdownMenuTrigger >

            <DropdownMenuContent className='me-5 w-44'>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>
                        <p className="font-semibold">
                            {auth?.name}
                        </p>
                    </DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                
                <DropdownMenuItem >
                    <Link href="#" className="cursor-pointer flex items-center gap-2">
                        <IoShirtOutline />
                        New Product
                    </Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem >
                    <Link href="#" className="cursor-pointer flex items-center gap-2">
                        <MdOutlineShoppingBag />
                        Orders
                    </Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                <Logout />
            

            
            </DropdownMenuContent>
        </DropdownMenu >
    )
}
export default UserDropdown