"use client"
import React, { use } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import { Button } from '@/components/ui/button'
import { FiPlus } from 'react-icons/fi'
import { showToast } from '@/lib/showToast'
import axios from 'axios'

const UploadMedia = ({ isMultiple ,queryClient}) => {

  const handleOnError = (error) => {
    showToast('error', error.statusText)
  }
  const handleOneQueueEnd = async (results) => {
    const files = results.info.files
    const uploadedFiles = files.filter(file => file.uploadInfo).map(file => ({
      asset_id: file.uploadInfo.asset_id,
      public_id: file.uploadInfo.public_id,
      secure_url: file.uploadInfo.secure_url,
      path: file.uploadInfo.path,
      thumbnail_url: file.uploadInfo.thumbnail_url,
    }))

    if (uploadedFiles.length > 0) {
      try {
        const { data: mediaUploadResponse } = await axios.post("/api/media/create", uploadedFiles)
        if (!mediaUploadResponse.success) {
          throw new Error(mediaUploadResponse.message)
        }

        await queryClient?.invalidateQueries({ queryKey: ['media-data'] })
        showToast("success", mediaUploadResponse.message)


      } catch (error) {
        showToast("error", error.message)

      }
    }
  }

  return (

    <CldUploadWidget
      signatureEndpoint="/api/cloudinary-signature"
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPDATE_PRESET}
      onError={handleOnError}
      onQueuesEnd={handleOneQueueEnd}
      config={{
        cloud: {

          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        }
      }}
      options={{
        multiple: isMultiple,
        sources: ['local', 'url', 'unsplash', 'google_drive']
      }}
    >



      {
        ({ open }) => {
          return (
            <Button onClick={() => open()} variant="outline">
              <FiPlus />
              Upload Media
            </Button>
          )
        }
      }



    </CldUploadWidget>
  )
}

export default UploadMedia
