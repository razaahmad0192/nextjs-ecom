'use client'
import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import Media from '@/components/Application/Admin/Media'
import UploadMedia from '@/components/Application/Admin/UploadMedia'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import useDeleteMutation from '@/hooks/useDeleteMutation'
import { ADMIN_DASHBOARD, ADMIN_MEDIA_SHOW } from '@/routes/AdminPanelRoute'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'





const breadcrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: "", label: "Media" },

]

const MediaPage = () => {


  const queryClient = useQueryClient()
  const [selectedMedia, setSelectedMedia] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const searchParams = useSearchParams()
  const deleteType = searchParams?.get('trashof') ? 'PD' : 'SD'

  const clearSelection = () => {
    setSelectedMedia([])
    setSelectAll(false)
  }



  const fetchMedia = async (page, deleteType) => {
    const { data: response } = await axios.get(`/api/media?page=${page}&&limit=10&&deleteType=${deleteType}`)
    // console.log(response)
    return response
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status
  } = useInfiniteQuery({
    queryKey: ['media-data', deleteType],
    queryFn: async ({ pageParam }) => await fetchMedia(pageParam, deleteType),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length
      return lastPage.hasMore ? nextPage : undefined
    },
  })

  const deleteMutation = useDeleteMutation('media-data', '/api/media/delete')

  const handleDelete = (selectedMedia, deleteType) => {
    let c = true
    if (deleteType === 'PD') {
      c = confirm("Are you sure you want to delete these items permanently? This action is irreversible.")
    }
    if (c) {
      // Proceed with deletion
      deleteMutation.mutate({ selectedMedia, deleteType })
    }
    setSelectAll(false)
    setSelectedMedia([])
  }
  const handleSelectAll = () => {
    const nextValue = !selectAll
    setSelectAll(nextValue)

    if (nextValue) {
      const ids = data?.pages?.flatMap(page => page.mediaData.map(media => media._id)) || []
      setSelectedMedia(ids)
    } else {
      setSelectedMedia([])
    }
  }



  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />


      <Card className="py-0 rounded shadow-sm">
        <CardHeader className='pt-3 py-2 px-3 border-b [.border-b]:pb-2'>
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-xl uppercase">
              {deleteType === 'SD' ? "Media Library" : "Trash Bin"}
            </h4>
            <div className="flex items-center gap-5">

             {
              deleteType === 'SD'  &&
             <UploadMedia isMultiple={true} queryClient={queryClient}/>
             }  
              <div className="flex gap-3">
                {
                  deleteType === 'SD'
                    ?
                    <Button type='button' variant='destructive'>
                      <Link href={`${ADMIN_MEDIA_SHOW}?trashof=media`} onClick={clearSelection}>
                        Trash
                      </Link>

                    </Button>
                    :
                    <>
                      <Button type='button'>
                        <Link href={`${ADMIN_MEDIA_SHOW}`} onClick={clearSelection}>
                          Back to Media
                        </Link>

                      </Button>
                    </>
                }
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {selectedMedia.length > 0 && (
            <div className="py-2 px-3 mb-2 rounded-2xl bg-transparent flex justify-between items-center gap-3">

              <Label>
                <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} className='border-primary cursor-pointer' />
                Select All
              </Label>


              <span className="text-sm">
                {selectedMedia.length} item(s) selected
              </span>
              <div className="flex gap">
                {
                  deleteType === 'SD'
                    ?
                    <Button variant='destructive' onClick={() => handleDelete(selectedMedia, deleteType)}>
                      Move into trash
                    </Button>
                    :
                    <div className='flex gap-2'>
                      <Button className='bg-green-500 hover:bg-green-600' onClick={() => handleDelete(selectedMedia, "RSD")}>
                        Restore
                      </Button>

                      <Button variant='destructive' onClick={() => handleDelete(selectedMedia, deleteType)}>
                        Move into trash
                      </Button>
                    </div>
                }
              </div>

            </div>

          )}
          {status === 'pending'
            ?
            <div>Loading...</div>
            :
            status === 'error' ?
              <div className='text-red-500 text-sm'>
                {error.message}
              </div>
              :
              <>
                {data.pages.flatMap(page => page.mediaData.map(media => media._id)).length === 0 && <div className='text-center'>No media found</div>}
                <div className='grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-2 mb-5'>
                  {
                    data?.pages?.map((page, index) => (
                      <React.Fragment key={index}>
                        {
                          page?.mediaData?.map((media) => (
                            <Media key={media._id}
                              media={media}
                              handleDelete={handleDelete}
                              deleteType={deleteType}
                              selectedMedia={selectedMedia}
                              setSelectedMedia={setSelectedMedia}
                            />

                          ))
                        }
                      </React.Fragment>
                    ))
                  }
                </div>
              </>

          }

          {hasNextPage && (
            <div className="flex justify-center mt-6 mb-4">
              <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage} variant='outline'>
                {isFetchingNextPage ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default MediaPage
