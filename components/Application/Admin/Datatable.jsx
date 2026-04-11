import { IconButton, Tooltip } from '@mui/material'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { MaterialReactTable, MRT_ShowHideColumnsButton, MRT_ToggleDensePaddingButton, MRT_ToggleFullScreenButton, MRT_ToggleGlobalFilterButton, useMaterialReactTable } from 'material-react-table'
import Link from 'next/link'
import React, { useState } from 'react'
import RecyclingIcon from '@mui/icons-material/Recycling';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ButtonLoading from '../ButtonLoading'
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { showToast } from '@/lib/showToast'
import { download, generateCsv, mkConfig } from 'export-to-csv'
import useDeleteMutation from '@/hooks/useDeleteMutation'





const Datatable = ({
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

    const [columnFilters, setColumnFilters] = useState([])
    const [globalFilter, setGlobalFilter] = useState('')
    const [sorting, setSorting] = useState([])
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: initialPageSize,
    })
    // Row selection state
    const [rowSelection, setRowSelection] = useState({})
    // export loading state
    const [exportLoading, setExportLoading] = useState(false)
    // Handle Delete Method 
    const deleteMutation = useDeleteMutation(queryKey, deleteEndpoint)
    const handleDelete = (selectedMedia, deleteType) => {
        let c
        if (deleteType === 'PD') {
            c = confirm("Are you sure you want to delete these items permanently? This action is irreversible.")
        } else {
            c = confirm("Are you sure you want to move these items to recycle bin?")
        }
        if (c) {
            // Proceed with deletion
            deleteMutation.mutate({ selectedMedia, deleteType })
            setRowSelection({})
        }

    }
    // Handle Export Method
    const handleExport = async (selectedRows) => {
        setExportLoading(true)
        try {
            const csvConfig = mkConfig({
                fieldSeparator: ',',
                decimalSeparator: '.',
                useKeysAsHeaders: true,
                filename: 'exported-data',
            })
            let csv 
            if(Object.keys(selectedRows).length > 0){
                // export only selected rows
                const rowData = selectedRows.map(row => row.original)
                csv = generateCsv(csvConfig)(rowData) 
            }else{
                // export all data
                const {data: response} = await axios.get(exportEndpoint)
                if(!response.success)
                {
                    throw new Error(response.message || 'Failed to fetch data for export')
                }
                const rowData = response.data
                csv = generateCsv(csvConfig)(rowData)
            }
            download(csvConfig)(csv)
        } catch (error) {
            console.log(error)
            showToast('error', error.message)
        } finally {
            setExportLoading(false)

        }
    }

    // Data fetching logics
    const {
        data: { data = [], meta } = {},
        isError,
        isRefetching,
        isLoading,
    } = useQuery({
        queryKey: [queryKey, [columnFilters, globalFilter, sorting, pagination]],
        queryFn: async () => {
            const url = new URL(fetchUrl, process.env.NEXT_PUBLIC_BASE_URL)
            url.searchParams.set(
                'start',
                `${pagination.pageIndex * pagination.pageSize}`,
            );
            url.searchParams.set('size', `${pagination.pageSize}`);
            url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
            url.searchParams.set('globalFilter', globalFilter ?? '');
            url.searchParams.set('sorting', JSON.stringify(sorting ?? []));


            const { data: response } = await axios.get(url.href)
            return response
        },
        placeholderData: keepPreviousData

    })
    
    // init table instance with react-table and pass the data and columns config
    const table = useMaterialReactTable({
        columns: columnsConfig,
        data,
        enableRowSelection: true,
        columnFilterDisplayMode: 'popover',
        paginationDisplayMode: 'pages',
        enableColumnOrdering: true,
        enableStickyHeader: true,
        enableStickyFooter: true,
        initialState: { showColumnFilters: true },
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        muiToolbarAlertBannerProps: isError
            ? {
                color: 'error',
                children: 'Error loading data',
            }
            : undefined,

        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        rowCount: meta?.totalRowCount ?? 0,
        onRowSelectionChange: setRowSelection,
        state: {
            columnFilters,
            globalFilter,
            isLoading,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isRefetching,
            sorting,
            rowSelection: rowSelection
        },
        getRowId: (originalRow) => originalRow._id,

        renderToolbarInternalActions: ({ table }) => {
            const hasSelectedRows = table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()

            return (
                <>
                    {/* built-in buttons (must pass in table prop for them to work!) */}
                    <MRT_ShowHideColumnsButton table={table} />
                    <MRT_ToggleGlobalFilterButton table={table} />
                    <MRT_ToggleFullScreenButton table={table} />
                    <MRT_ToggleDensePaddingButton table={table} />
                    {/* add your own custom print button or something */}

                    {deleteType !== 'PD'
                        &&
                        <Tooltip title="Resycle Bin">
                            <Link href={trashView}>
                                <IconButton>
                                    <RecyclingIcon />
                                </IconButton>
                            </Link>
                        </Tooltip>
                    }
                    {deleteType === 'SD'
                        &&
                        <Tooltip title="Delete All Selected">
                               
                                <IconButton disabled={!hasSelectedRows} onClick={() => handleDelete(Object.keys(rowSelection), deleteType)}>
                                    <DeleteIcon />
                                </IconButton>
                            
                        </Tooltip>

                    }
                    {deleteType === 'PD'
                        &&
                        <>
                            <Tooltip title="Restore Data">
                               
                                    <IconButton disabled={!hasSelectedRows} onClick={() => handleDelete(Object.keys(rowSelection), 'RSD')}>
                                        <RestoreFromTrashIcon />
                                    </IconButton>
                     
                            </Tooltip>
                            <Tooltip title="Permanently Delete Data">
                              
                                    <IconButton disabled={!hasSelectedRows} onClick={() => handleDelete(Object.keys(rowSelection), deleteType)}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                       
                            </Tooltip>
                        </>

                    }
                </>
            )
        },
        enableRowActions: true,
        positionActionsColumn: 'last',
        renderRowActionMenuItems: ({ row }) => createAction(row, deleteType, handleDelete),
        renderTopToolbarCustomActions: ({ table }) => (
            <Tooltip>
                <ButtonLoading 
                type='button' 
                text={<><SaveAltIcon fontSize='25'/> Export</>} 
                loading={exportLoading} 
                onClick={() => {handleExport(table.getPreSelectedRowModel().rows)}}
                className='cursor-pointer'
                >
           

                </ButtonLoading>
            </Tooltip>
        )
    })

    return (
        <MaterialReactTable table={table}/>
    )
}

export default Datatable
