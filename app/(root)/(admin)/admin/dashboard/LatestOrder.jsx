import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import React from 'react'

const LatestOrder = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Order Id</TableHead>
                    <TableHead>Payment Id</TableHead>
                    <TableHead>Total Item</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.from({ length: 20 }).map((_, i) => (

                    <TableRow key={i}>

                        <TableCell>{`INV00${String(i + 1)}`}</TableCell>
                        <TableCell>{`PAY${String(i + 1)}`}</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>Pending</TableCell>
                        <TableCell  className='text-right'>100</TableCell>

                    </TableRow>
                ))}
            </TableBody>
        </Table>

    )
}

export default LatestOrder
