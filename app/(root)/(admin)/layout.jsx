import AppSidebar from '@/components/Application/Admin/AppSidebar'
import Topbar from '@/components/Application/Admin/Topbar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

const layout = ({ children }) => {
  const currentYear = new Date().getFullYear()

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className=' md:w-[calc(100vw-16rem)]'>
        <Topbar/>
        <div className='px-8 pt-[70px] min-h-[calc(100vh-40px)] pb-10 '>
        {children}
        </div>
        <div className="border-t min-h-10 px-4 py-2 flex justify-center items-center bg-gray-50 dark:bg-background text-sm text-muted-foreground">
          <p>Copyright {currentYear} NextJS Ecom Admin. All rights reserved.</p>
        </div>
      </main>
    </SidebarProvider>
  )
}

export default layout
