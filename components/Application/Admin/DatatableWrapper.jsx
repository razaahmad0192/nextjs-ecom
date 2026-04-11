'use client'

import { ThemeProvider } from "@mui/material"
import Datatable from "./Datatable"
import { darkTheme, lightTheme } from "@/lib/materialTheme"
import { useEffect, useState } from "react"

const DatatableWrapper = ({
    queryKey,
    fetchUrl,
    columnsConfig,
    initialPageSize = 10,
    exportEndpoint,
    deleteEndpoint,
    deleteType,
    trashView,
    createAction
}) => {
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Check if dark class exists on html element
    const isDark = document.documentElement.classList.contains('dark')
    setTheme(isDark ? 'dark' : 'light')
    setMounted(true)

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark')
      setTheme(isDark ? 'dark' : 'light')
    })

    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    })

    return () => observer.disconnect()
  }, [])

  if(!mounted) return null

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        <Datatable
            queryKey={queryKey}
            fetchUrl={fetchUrl}
            columnsConfig={columnsConfig}
            initialPageSize={initialPageSize}
            exportEndpoint={exportEndpoint}
            deleteEndpoint={deleteEndpoint}
            deleteType={deleteType}
            trashView={trashView}
            createAction={createAction}
        />
    </ThemeProvider>
  )
}

export default DatatableWrapper
