'use client'

import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Listing } from '@prisma/client';

import EditListing from '@/components/EditListing';
import { Suspense, useState } from 'react';

import  { ModalDialogProps } from "@mui/joy/ModalDialog";

import Loader from './Loader';
import ListingsTable from './ListingsTable';
const UserListings = () => {
   const [listing, setListing] = useState<Listing | null>(null);
   const [layout, setLayout] = useState<
     ModalDialogProps["layout"] | undefined
   >(undefined);

    return (
      
        <>
        
        <TableContainer component={Paper} className="">
                 <h1 className="text-2xl text-orange-800 font-bold text-center my-3">
                   My Property Listing
                 </h1>
                 <Table aria-label="simple table">
                   <TableHead>
                     <TableRow>
                       <TableCell align="left" sx={{ fontWeight: 700, fontSize: 20 }}>
                         Title
                       </TableCell>
                       <TableCell align="left" sx={{ fontWeight: 700, fontSize: 20 }}>
                         State
                       </TableCell>
                       <TableCell align="left" sx={{ fontWeight: 700, fontSize: 20 }}>
                         Price&nbsp;(₦)
                       </TableCell>
                       <TableCell align="left" sx={{ fontWeight: 700, fontSize: 20 }}>
                         Action
                       </TableCell>
                     </TableRow>
                   </TableHead>
                   <TableBody>
                        <Suspense fallback={<Loader/>}>
                            <ListingsTable setLayout={setLayout} setListing={setListing}/>
                </Suspense>
                   </TableBody>
                 </Table>
               </TableContainer>
               <EditListing layout={layout} setLayout={setLayout} listing={listing as Listing}/>
        </>
  )
}

export default UserListings