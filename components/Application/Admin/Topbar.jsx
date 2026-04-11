import React from 'react'
import UserDropdown from './UserDropdown'
import ThemeSwitch from './ThemeSwitch'
import { Button } from '@/components/ui/button'
import {RiMenu4Fill} from "react-icons/ri"
const Topbar = () => {
  return (
    <div className='fixed border h-14 w-full top0 left-0 z-30  md:ps-72 md:pe-10 flex justify-between items-center bg-white dark:bg-card  '>
        <div>
            search component
        </div>
        <div className='flex items-center gap-2'>
            <ThemeSwitch/>
            <UserDropdown/>
            <Button type="button" size='icon' className='ms-2' >
                <RiMenu4Fill/>
            </Button>
        </div>

    </div>
  )
}

export default Topbar
