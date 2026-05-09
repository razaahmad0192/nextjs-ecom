import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { sortings } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { LuFilter } from 'react-icons/lu'

const Sorting = ({ limit, setLimit, sorting, setSorting, mobileFilterOpen, setMobileFilterOpen }) => {
    return (
        <div className='flex flex-col gap-4 p-4 bg-gray-50 lg:flex-row lg:items-center lg:justify-between'>
            <div className='flex items-center gap-4 justify-between'>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setMobileFilterOpen(true)}
                >
                    <LuFilter className="mr-2" size={18} />
                    Filters
                </Button>
                <ul className='flex items-center gap-4'>
                    <li className='font-semibold whitespace-nowrap'>Show</li>
                    {[9, 12, 18].map((limitNumber) => (
                        <li key={limitNumber} className='cursor-pointer hover:text-blue-500' onClick={() => setLimit(limitNumber)}>
                            <button type="button" className={`${limit === limitNumber ? 'w-8 h-8 flex justify-center items-center rounded-full bg-primary text-white text-sm cursor-pointer' : 'cursor-pointer'}`}>
                                {limitNumber}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <Select value={sorting} onValueChange={(value) => setSorting(value)}>
                <SelectTrigger className='w-full lg:w-56'>
                    <SelectValue placeholder="Default Sorting" />
                </SelectTrigger>
                <SelectContent>
                    {sortings.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default Sorting
