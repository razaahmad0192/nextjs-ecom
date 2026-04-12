import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import React from 'react'

const ModelMediaBlock = ({ media, selectedMedia, setSelectedMedia, isMultiple }) => {
    const selectedItems = Array.isArray(selectedMedia) ? selectedMedia : []
    const isSelected = selectedItems.some((m) => m._id === media._id)

    
    const handleCheck = () => {
        let newSelectedMedia = []
        
        if (isMultiple) {
            if (isSelected) {
                newSelectedMedia = selectedItems.filter(m => m._id !== media._id)
            } else {
                newSelectedMedia = [...selectedItems, {
                    _id: media._id,
                    url: media.secure_url
                }]
            }
            setSelectedMedia(newSelectedMedia)
        } else {
            newSelectedMedia = isSelected ? [] : [{
                _id: media._id,
                url: media.secure_url
            }]
            setSelectedMedia(newSelectedMedia)
        }
    }
    return (
        <div
            className='border border-gray-200 dark:border-gray-800 relative group rounded overflow-hidden cursor-pointer'
            onClick={handleCheck}
        >
            {media.name}
            <div className="absolute top-2 left-2 z-20" onClick={(e) => e.stopPropagation()}>
                <Checkbox 
                id={media._id} 
                checked={isSelected} 
                onCheckedChange={handleCheck}
                />
            </div>
            <div className="size-full relative">
                <Image
                    src={media?.secure_url}
                    alt={media?.alt || 'Media Image'}
                    width={300}
                    height={300}
                    className='object-cover md:h-[150px] h-[100px]'
                />
            </div>
        </div>
    )
}

export default ModelMediaBlock
