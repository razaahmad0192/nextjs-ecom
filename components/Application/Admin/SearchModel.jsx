'use client'
import React, { useMemo, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import Fuse from 'fuse.js'
import searchData from '@/lib/search'


const options = {
    keys: ['label', 'description', 'keywords'],
    threshold: 0.3, // Adjust this value to control the sensitivity of the search
}

const SearchModel = ({ open, setOpen }) => {
    const [query, setQuery] = useState('')

    const fuse = useMemo(() => new Fuse(searchData, options), [])
    const results = useMemo(() => {
        if (query.trim() === '') {
            return []
        }

        return fuse.search(query).map(result => result.item)
    }, [query, fuse])


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Quick Search</DialogTitle>
                    <DialogDescription>
                        Find and navigate to any admin section instantly. Type a keyword to get started.
                    </DialogDescription>
                </DialogHeader>

                <Input
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus 
                />

                <ul className="mt-4 max-h-60 overflow-y-auto">
                    {results.map((item, index) => (
                        <li key={index}>
                            <Link 
                            href={item.url} 
                            className='block py-2 px-3 rounded hover:bg-muted'
                            onClick={()=>{setOpen(false)}}
                            >
                                <h4 className="font-medium">
                                    {item.label}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    {item.description}
                                </p>
                            </Link>
                        </li>
                    ))}
                    {query && results.length === 0 && <div>
                        <p className="text-sm text-muted-foreground">
                            No results found for "{query}"
                        </p>
                    </div>}
                </ul>


            </DialogContent>
        </Dialog>
    )
}

export default SearchModel
