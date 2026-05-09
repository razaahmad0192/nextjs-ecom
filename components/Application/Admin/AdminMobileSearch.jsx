import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import SearchModel from './SearchModel'

const AdminMobileSearch = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Button type="button" size='icon' className='ms-2 md:hidden' variant='ghost' onClick={() => setOpen(true)}>
                <IoIosSearch />
            </Button>
            <SearchModel open={open} onOpenChange={setOpen} />
        </>
    )
}

export default AdminMobileSearch
