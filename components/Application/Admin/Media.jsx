import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { showToast } from "@/lib/showToast"
import { ADMIN_MEDIA_EDIT } from "@/routes/AdminPanelRoute"
import Image from "next/image"
import Link from "next/link"
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoIosLink } from "react-icons/io"
import { LuTrash } from "react-icons/lu"
import { MdOutlineEdit } from "react-icons/md"


const Media = ({ media, handleDelete, deleteType, selectedMedia, setSelectedMedia }) => {

    const handleCheck = () => {
        let newSelectedMedia = []
        if(selectedMedia?.includes(media?._id))
        {
            newSelectedMedia = selectedMedia?.filter((id)=> id !== media?._id)
        }else{
            newSelectedMedia = [...selectedMedia, media?._id]
        }
        setSelectedMedia(newSelectedMedia)
    }
    //    console.log(media.media,"Media component")
    const handleCopyLink = async (url) => {
      await navigator.clipboard.writeText(media?.secure_url)
        showToast('success', "Link Copied to Clipboard")
      
    }
    

    
    return (
        <div className="group border border-gray-200 dark:border-gray-800 relative rounded overflow-hidden ">
            <div className="absolute top-2 left-2 z-20 ">
                <Checkbox
                    checked={selectedMedia?.includes(media?._id)}
                    onCheckedChange={handleCheck}
                    className='border-red-500 cursor-pointer'
                />
            </div>


            <div className="absolute top-2 right-2 z-20">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <span className="w-7 h-7 flex items-center justify-center rounded-full bg-black/50">
                            <BsThreeDotsVertical color="#fff" className="cursor-pointer" />
                        </span>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className='w-full' align="start">
                        {deleteType === 'SD' &&
                            <>
                                <DropdownMenuItem asChild className='cursor-pointer'>
                                    <Link className="flex items-center gap-1.5" href={ADMIN_MEDIA_EDIT(media?._id)}>
                                        <MdOutlineEdit />
                                        Edit
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className='cursor-pointer' onClick={() => handleCopyLink(media?.secure_url)}>

                                    <IoIosLink />
                                    Copy Link

                                </DropdownMenuItem>
                            </>
                        }
                        <DropdownMenuItem className='cursor-pointer' onClick={() => handleDelete([media?._id], deleteType)}>
                           
                            <LuTrash color="red" />
                            {deleteType === 'SD' ? "Move into Trash" : "Delete Permanently"}
                           
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="absolute inset-0 z-10 pointer-events-none transition-all duration-150 ease-in group-hover:bg-black/30"></div>
            <div>
                <Image
                    src={media?.secure_url}
                    alt={media?.alt || "Image"}
                    height={300}
                    width={300}
                    className="object-cover w-full sm:h-[200px] h-[150px]"
                />


            </div>
        </div>
    )

}


export default Media