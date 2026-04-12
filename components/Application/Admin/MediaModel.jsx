import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import loading from '@/public/assets/images/loading.svg'
import ModelMediaBlock from './ModelMediaBlock'
import { showToast } from '@/lib/showToast'
const MediaModel = ({ open, setOpen, selectedMedia = [], setSelectedMedia, isMultiple }) => {

    const [prevSelected, setPrevSelected] = useState([])
    const fetchMedia = async (page) => {
        const { data: response } = await axios.get(`/api/media?page=${page}&&limit=18&&deleteType=SD`)
        return response

    }
    const { isPending, isError, error, data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['MediaModel'],
        queryFn: async ({ pageParam }) => await fetchMedia(pageParam),
        placeholderData: keepPreviousData,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length
            return lastPage.hasMore ? nextPage : undefined
        }
    })
    const handleClear = () => {
        setSelectedMedia([])
        setPrevSelected([])
        showToast('success', 'Media selection cleared')
    }
    const handleClose = () => {
        setSelectedMedia(prevSelected)
        setOpen(false)

    }
    const handleSelect = () => {
        if (selectedMedia.length <= 0) {
            return showToast('error', 'Please select at least one media')
        }
        setPrevSelected(selectedMedia)
        setOpen(false)
    }

    return (

        <Dialog
            open={open}
            onOpenChange={() => setOpen(!open)} >
            <DialogContent onInteractOutside={(e) => e.preventDefault()}
                className='p-0 overflow-hidden border-0 shadow-none ring-0 bg-white flex flex-col gap-0'
                style={{
                    width: '80vw',
                    maxWidth: '80vw',
                    height: '80vh',
                    maxHeight: '80vh',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <DialogDescription className='hidden'></DialogDescription>

                <div className='h-full min-h-0 p-3 flex flex-col'>
                    <DialogHeader className='h-8 border-b shrink-0'>
                        <DialogTitle>Media Selection</DialogTitle>
                    </DialogHeader>

                    <div className="flex-1 min-h-0 overflow-auto py-2">
                        {isPending ?
                            (
                                <div className='size-full flex justify-center items-center '>
                                    <Image src={loading} alt="Loading" height={80} width={80} />
                                </div>
                            )
                            :
                            isError ?
                                <div className='size-full flex justify-center items-center'>
                                    <span className='text-red-500'>{error.message}</span>
                                </div>
                                :
                                <>
                                    <div className='grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-1 mb-5'>
                                        {
                                            data?.pages?.map((page, index) => (
                                                <React.Fragment key={index}>
                                                    {
                                                        page?.mediaData?.map((media) => (
                                                            <ModelMediaBlock
                                                                key={media._id}
                                                                media={media}
                                                                selectedMedia={selectedMedia}
                                                                setSelectedMedia={setSelectedMedia}
                                                                isMultiple={isMultiple}
                                                            />

                                                        ))
                                                    }
                                                </React.Fragment>
                                            ))
                                        }
                                    </div>
                                </>
                        }
                    </div>

                    <div className="h-10 pt-3 border-t flex justify-between shrink-0 mt-auto">
                        <div>
                            <Button type="button" variant='destructive' onClick={handleClear}>
                                Clear All
                            </Button>
                        </div>
                        <div className='flex gap-5'>
                            <Button type="button" variant='secondary' onClick={handleClose}>
                                Close
                            </Button>
                            <Button type="button" onClick={handleSelect}>
                                Select
                            </Button>
                        </div>
                    </div>
                </div>


            </DialogContent>
        </Dialog >

    )
}

export default MediaModel
