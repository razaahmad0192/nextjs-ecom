import Image from 'next/image'
import React from 'react'
import logo from '@/public/assets/images/logo-black.png'
import Link from 'next/link'
import { WEBSITE_HOME, WEBSITE_LOGIN, WEBSITE_REGISTER } from '@/routes/WebsiteRoute'
import { IoLocationOutline } from 'react-icons/io5'
import { MdOutlineEmail, MdOutlinePhone } from 'react-icons/md'
import { AiOutlineYoutube } from 'react-icons/ai'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { FiTwitter } from 'react-icons/fi'
import { TiSocialFacebookCircular } from 'react-icons/ti'
const Footer = () => {
    return (
        <footer className='bg-gray-50 border-t'>
            <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-10 py-10 lg:px-32 px-4">
                <div className="lg:col-span-1 md:col-span-2 col-span-1">
                    <Image
                        src={logo}
                        width={383}
                        height={146}
                        className='w-36 mb-2'
                        alt="Logo"
                    />
                    <p className="text-gray-500 text-sm">
                        E-Store is your trusted destinantion for quality and convenience. From fashion to essentials, we bring everything you need right to your doorstep. Shop with confidence and experience the joy of effortless online shopping with us.
                    </p>

                </div>

                <div >
                    <h4 className='text-xl font-bold uppercase mb-5'>Catergories</h4>
                    <ul>
                        <li className='mb-2 text-gray-500 cursor-pointer'>
                            <Link href={''}>T-shirts</Link>
                        </li>
                        <li className='mb-2 text-gray-500 cursor-pointer'>
                            <Link href={''}>Hoodies</Link>
                        </li>
                        <li className='mb-2 text-gray-500 cursor-pointer'>
                            <Link href={''}>Oversized</Link>
                        </li>
                        <li className='mb-2 text-gray-500 cursor-pointer'>
                            <Link href={''}>Full Sleeves</Link>
                        </li>
                        <li className='mb-2 text-gray-500 cursor-pointer'>
                            <Link href={''}>Polo</Link>
                        </li>
                    </ul>
                </div>
                <div >
                    <h4 className='text-xl font-bold uppercase mb-5'>Usefull Links</h4>
                    <ul>
                        <li className='mb-2 text-gray-500 cursor-pointer'>
                            <Link href={WEBSITE_HOME}>Home</Link>
                        </li>
                        <li className='mb-2 text-gray-500 cursor-pointer'>
                            <Link href={''}>Shop</Link>
                        </li>
                        <li className='mb-2 text-gray-500 cursor-pointer'>
                            <Link href={''}>About</Link>
                        </li>
                        <li className='mb-2 text-gray-500 cursor-pointer'>
                            <Link href={WEBSITE_REGISTER}>Register</Link>
                        </li>
                        <li className='mb-2 text-gray-500 cursor-pointer'>
                            <Link href={WEBSITE_LOGIN}>Login</Link>
                        </li>
                    </ul>
                </div>
                <div >
                    <h4 className='text-xl font-bold uppercase mb-5'>Help Center</h4>
                    <ul>
                        <li className='mb-2 text-gray-500 cursor-pointer'>
                            <Link href={''}>Register</Link>
                        </li>
                        <li className='mb-2 text-gray-500 cursor-pointer'>
                            <Link href={''}>Login</Link>
                        </li>
                        <li className='mb-2 text-gray-500 cursor-pointer'>
                            <Link href={''}>My Account</Link>
                        </li>
                        <li className='mb-2 text-gray-500 cursor-pointer'>
                            <Link href={''}>Privacy Policy</Link>
                        </li>
                        <li className='mb-2 text-gray-500 cursor-pointer'>
                            <Link href={''}>Terms & Conditions</Link>
                        </li>
                    </ul>
                </div>
                <div >
                    <h4 className='text-xl font-bold uppercase mb-5'>Contact Us</h4>
                    <ul>
                        <li className='mb-2 text-gray-500 text-sm cursor-pointer flex items-center gap-2'>
                            <IoLocationOutline />
                            <span className='text-sm'>123 Main Street, City, Country</span>

                        </li>
                        <li className='mb-2 text-gray-500 cursor-pointer flex items-center gap-2'>
                            <MdOutlinePhone />
                            <span className='text-sm'>+1 (123) 456-7890</span>
                        </li>
                        <li className='mb-2 text-gray-500 cursor-pointer flex items-center gap-2'>
                            <MdOutlineEmail />
                            <span className='text-sm'>info@estore.com</span>
                        </li>
                    </ul>
                    <div className="flex gap-5 mt-5">
                        <Link href=""><AiOutlineYoutube size={25} className='text-primary' /></Link>
                        <Link href=""><FaInstagram size={25} className='text-primary' /></Link>
                        <Link href=""><FaWhatsapp size={25} className='text-primary' /></Link>
                        <Link href=""><TiSocialFacebookCircular size={25} className='text-primary' /></Link>
                        <Link href=""><FiTwitter size={25} className='text-primary' /></Link>
                    </div>
                </div>
            </div>


            <div className="py-5 bg-gray-100">
                <p className="text-center">© 2023 eStore. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
