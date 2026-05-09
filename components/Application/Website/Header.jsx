'use client'
import { WEBSITE_HOME, WEBSITE_LOGIN, WEBSITE_SHOP } from '@/routes/WebsiteRoute'
import Link from 'next/link'
import React, { useState } from 'react'
import logo from '@/public/assets/images/logo-black.png'
import Image from 'next/image'
import { IoIosSearch, IoMdClose } from 'react-icons/io'
import Cart from './Cart'
import { VscAccount } from 'react-icons/vsc'
import { useSelector } from 'react-redux'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import userIcon from '@/public/assets/images/user.png'
import { HiMiniBars3 } from 'react-icons/hi2'
import Search from './Search'
const Header = () => {

    const auth = useSelector(store => store.authStore.auth)
    const [isMobileMenu, setIsMobileMenu] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    return (
        <div className='bg-white border-b lg:px-32 px-4'>
            <div className="flex justify-between items-center lg:py-5 py-3">
                <Link href={WEBSITE_HOME}>
                    <Image src={logo} width={383} height={146} className='lg:w-32 w-24' alt="Logo" />
                </Link>

                <div className="flex justify-between gap-20">
                    <nav className={`lg:relative lg:w-auto lg:top-0 lg:left-0 lg:p-0 bg-white lg:h-auto fixed z-50 top-0 w-full h-screen transition-all ${isMobileMenu ? 'left-0' : '-left-full'}  `}>
                        <div className="lg:hidden flex justify-between items-center bg-gray-50   py-3 border-b px-3">
                            <Image
                                src={logo}
                                width={383}
                                height={146}
                                className='lg:w-32 w-24'
                                alt="Logo"
                            />
                            <button type='button' onClick={() => setIsMobileMenu(false)}>
                                <IoMdClose className='text-gray-500  cursor-pointer hover:text-primary' size={25} />
                            </button>
                        </div>
                        <ul className='lg:flex justify-between items-center gap-10 px-3 lg:text-lg text-sm  '>
                            <li className='text-gray-600 cursor-pointer hover:text-primary hover:font-semibold'>
                                <Link href={WEBSITE_HOME} className='block py-2'>Home</Link>
                            </li>
                            <li className='text-gray-600 cursor-pointer hover:text-primary hover:font-semibold'>
                                <Link href={WEBSITE_HOME} className='block py-2'>About</Link>
                            </li>
                            <li className='text-gray-600 cursor-pointer hover:text-primary hover:font-semibold'>
                                <Link href={WEBSITE_SHOP} className='block py-2'>Shop</Link>
                            </li>
                            <li className='text-gray-600 cursor-pointer hover:text-primary hover:font-semibold'>
                                <Link href={WEBSITE_HOME} className='block py-2'>T-shirt</Link>
                            </li>
                            <li className='text-gray-600 cursor-pointer hover:text-primary hover:font-semibold'>
                                <Link href={WEBSITE_HOME} className='block py-2'>Hoodies</Link>
                            </li>
                            <li className='text-gray-600 cursor-pointer hover:text-primary hover:font-semibold'>
                                <Link href={WEBSITE_HOME} className='block py-2'>Oversized</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="flex justify-between cursor-pointer items-center gap-4 md:gap-8">
                        <button  type='button' onClick={() => setShowSearch(!showSearch)}>
                            <IoIosSearch
                                className='text-gray-500 cursor-pointer  hover:text-primary'
                                size={25}
                            />
                        </button>
                        <Cart />
                        {!auth ?
                            <Link href={WEBSITE_LOGIN}>
                                <VscAccount
                                    className='text-gray-500  cursor-pointer hover:text-primary'
                                    size={25}
                                />
                            </Link>
                            :
                            <Link href={WEBSITE_LOGIN}>
                                <Avatar>
                                    <AvatarImage src={auth?.avatar?.url || userIcon.src} />
                                </Avatar>
                            </Link>
                        }
                        <button type='button' onClick={() => setIsMobileMenu(true)} className='lg:hidden block'>
                            <HiMiniBars3 className='text-gray-500  cursor-pointer hover:text-primary' size={25} />
                        </button>

                    </div>
                </div>
            </div>
            <Search isShow={showSearch} />
        </div>
    )
}

export default Header
