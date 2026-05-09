'use client'
import React, { useState } from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from "@/components/ui/sidebar"
import logoBlack from "@/public/assets/images/logo-black.png"
import logoWhite from "@/public/assets/images/logo-white.png"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { LuChevronRight } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { AdminAppSidebarMenu } from '@/lib/adminSidebarMenu'
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import Link from 'next/link'

const AppSidebar = () => {
    const [openMenus, setOpenMenus] = useState({})
    const { isMobile, setOpenMobile, setOpen } = useSidebar()

    const handleMenuToggle = (index, isOpen) => {
        setOpenMenus((prev) => ({ ...prev, [index]: isOpen }))
    }

    const handleCloseSidebar = () => {
        if (isMobile) {
            setOpenMobile(false)
            return
        }

        setOpen(false)
    }

    const handleMenuLinkClick = () => {
        if (isMobile) {
            setOpenMobile(false)
        }
    }

    return (

        <Sidebar className='z-40'>
            <SidebarHeader className={'border-b h-14 p-0'}>
                <div className='flex justify-between items-center px-4'>

                    <Image src={logoBlack.src} width={logoBlack.width - 200} className="h-12.5 w-auto block dark:hidden " height={50} alt="Logo Dark" />
                    <Image src={logoWhite.src} width={logoWhite.width - 200} className="h-12.5 w-auto hidden dark:block " height={50} alt="Logo White" />
                    <Button type='button' size='icon' className='md:hidden' onClick={handleCloseSidebar}>
                        <IoMdClose />
                    </Button>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu>
                    {AdminAppSidebarMenu.map((menu, index) => { 
                        const IconComponent = menu.icon
                        const hasSubmenu = menu.submenu && menu.submenu.length > 0
                        const isOpen = !!openMenus[index]

                        return (
                            <Collapsible
                                key={index}
                                className="group/collapsible"
                                open={isOpen}
                                onOpenChange={(nextOpen) => handleMenuToggle(index, nextOpen)}
                            >
                                <SidebarMenuItem>
                                    {hasSubmenu ? (
                                        <SidebarMenuButton
                                            className='font-semibold px-2 py-5'
                                            onClick={() => handleMenuToggle(index, !isOpen)}
                                        >
                                            <IconComponent />
                                            {menu.title}
                                            <LuChevronRight className={`ml-auto transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
                                        </SidebarMenuButton>
                                    ) : (
                                        <SidebarMenuButton
                                            className='font-semibold px-2 py-5'
                                            render={<Link href={menu?.url} />}
                                            onClick={handleMenuLinkClick}
                                        >
                                            <IconComponent />
                                            {menu.title}
                                        </SidebarMenuButton>
                                    )}

                                    {hasSubmenu
                                        &&
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {menu.submenu.map((submenuItem, subMenuIndex) => {
                                                    return (
                                                    <SidebarMenuSubItem key={subMenuIndex}>
                                                        <SidebarMenuSubButton
                                                            className='px-2 py-5'
                                                            render={<Link href={submenuItem.url} />}
                                                            onClick={handleMenuLinkClick}
                                                        >
                                                            {submenuItem.title}
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                    )
                                                })}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    }
                                </SidebarMenuItem>
                            </Collapsible>
                        )
                    })}
                </SidebarMenu>
            </SidebarContent>

        </Sidebar>

    )
}

export default AppSidebar
