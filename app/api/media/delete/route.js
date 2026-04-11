import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
import MediaModel from "@/models/Media.model";

export async function PUT(request) {
    try {
        const auth = await isAuthenticated('admin')
        if (!auth.isAuth) {
            return response(false, 403, "Unauthorized")
        }

        await connectDB()
        const payload = await request.json()
        const ids = payload.ids || []
        const deleteType = payload.deleteType
        if (!Array.isArray(ids) || ids.length === 0) {
            return response(false, 400, "Invalid or missing IDs")
        }

        const media = await MediaModel.find({ _id: { $in: ids } }).lean()
        if (!media.length) {
            return response(false, 404, "Data not found")
        }
        if (!['SD', 'RSD'].includes(deleteType)) {
            return response(false, 400, "Invalid delete type")
        }
        if (deleteType === 'SD') {
            await MediaModel.updateMany({ _id: { $in: ids } }, { $set: { deletedAt: new Date().toISOString() } });
        }
        else if (deleteType === 'RSD') {
            await MediaModel.updateMany({ _id: { $in: ids } }, { $set: { deletedAt: null } });
        }
        return response(true, 200, deleteType === 'SD' ? "Data moved into Trash" : "Data restored successfully")
    } catch (error) {
        return catchError(error)
    }
}
export async function DELETE(request) {
    try {
        const auth = await isAuthenticated('admin')
        if (!auth.isAuth) {
            return response(false, 403, "Unauthorized")
        }

        await connectDB()

        const payload = await request.json()
        const ids = payload.ids || []
        const deleteType = payload.deleteType
        if (!Array.isArray(ids) || ids.length === 0) {
            return response(false, 400, "Invalid or missing IDs")
        }

        const media = await MediaModel.find({ _id: { $in: ids } }).lean()
        if (!media.length) {
            return response(false, 404, "Data not found")
        }
        if (deleteType !== 'PD') {
            return response(false, 400, "Invalid delete type")
        }

        await MediaModel.deleteMany({ _id: { $in: ids } })

        const publicIds = media.map(m => m.public_id)

        try {
            await cloudinary.api.delete_resources(publicIds)
        } catch (error) {
            await MediaModel.insertMany(media)
            return catchError(error)
        }

        return response(true, 200, "Data deleted Permanently")
    } catch (error) {
        return catchError(error)
    }
}