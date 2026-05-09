'use client'
import React from 'react'
import UserDropdown from './UserDropdown'
import ThemeSwitch from './ThemeSwitch'
import { Button } from '@/components/ui/button'
import { RiMenu4Fill } from "react-icons/ri"
import AdminSearch from './AdminSearch'
import Image from 'next/image'
import logoBlack from "@/public/assets/images/logo-black.png"
import logoWhite from "@/public/assets/images/logo-white.png"
import { useSidebar } from '@/components/ui/sidebar'
import AdminMobileSearch from './AdminMobileSearch'


const Topbar = () => {
    const { toggleSidebar } = useSidebar()
   
    return (
        <div className='fixed border h-14 w-full top0 left-0 z-30  md:ps-72 md:pe-10 px-3 flex justify-between items-center bg-white dark:bg-card  '>
            <div className='flex items-center md:hidden'>
                <Image src={logoBlack.src} width={logoBlack.width - 200} className="h-12.5 w-auto block dark:hidden " height={50} alt="Logo Dark" />
                <Image src={logoWhite.src} width={logoWhite.width - 200} className="h-12.5 w-auto hidden dark:block " height={50} alt="Logo White" />
            </div>

            <div className='md:block hidden'>
                <AdminSearch />
            </div>
            <div className='flex items-center gap-2'>
                <AdminMobileSearch/>
                <ThemeSwitch />
                <UserDropdown />
                <Button type="button" size='icon' className='ms-2' onClick={toggleSidebar}>
                    <RiMenu4Fill />
                </Button>
            </div>
        </div>
    )
}

export default Topbar
