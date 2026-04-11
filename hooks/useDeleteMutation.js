import { showToast } from "@/lib/showToast"
import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useDeleteMutation = (queryKey, deleteEndPoint)=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ selectedMedia, deleteType }) => {
            const {data:response} = await axios({
                url: deleteEndPoint,
                method: deleteType === 'PD' ? 'DELETE' : 'PUT',
                data: { ids: selectedMedia, deleteType }
            })
            if(!response.success){
                throw new Error(response.message || "Something went wrong")
            }
            return response
        },
        onSuccess: (data) => {
            showToast('success', data.message || "Operation successful")
            queryClient.invalidateQueries([queryKey])
        },
        onError: (error) => {
            const message = error?.response?.data?.message || error?.response?.data?.error || error?.message || "Something went wrong"
            showToast('error', message)
        }

    })
}
export default useDeleteMutation