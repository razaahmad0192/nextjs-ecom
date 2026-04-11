export const ADMIN_DASHBOARD = "/admin/dashboard"

// Media Routes
export const ADMIN_MEDIA_SHOW = '/admin/media'
export const ADMIN_MEDIA_EDIT = (id)=>id? `/admin/media/edit/${id}`:null


// Category Routes

export const ADMIN_CATEGORY_ADD = "/admin/category/add"
export const ADMIN_CATEGORY_EDIT = (id)=>id? `/admin/category/edit/${id}`:null
export const ADMIN_CATEGORY_SHOW = "/admin/category"
export const ADMIN_CATEGORY_ALL = "/admin/category/all"

// Product Routes
export const ADMIN_PRODUCT_ADD = "/admin/product/add"
export const ADMIN_PRODUCT_EDIT = (id)=>id? `/admin/product/edit/${id}`:null
export const ADMIN_PRODUCT_ALL = "/admin/product/all"
export const ADMIN_PRODUCT_VARIANTS = "/admin/product/variants"

// Trash Route
export const ADMIN_TRASH = "/admin/trash"
