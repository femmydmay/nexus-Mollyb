'use client'
import { Fetcher } from '@/types/fetch';
import useSWR from 'swr'
import React, { useState } from 'react'

import axios from 'axios';
import ModalDialog, { ModalDialogProps } from "@mui/joy/ModalDialog";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Listing } from '@prisma/client';
import Loading from '@/components/Loading';
import EditListing from '@/components/EditListing';
import { toast } from 'react-hot-toast';
const fetcher: Fetcher = (url) =>
  axios
    .get(url as string,)
    .then((res) => res.data);
const Page = () => {
  const { data, isLoading, error, mutate } = useSWR('/api/users/user/listings', fetcher)
  const [listing, setListing] =  useState<Listing|null>(null)
    const [layout, setLayout] = React.useState<
      ModalDialogProps["layout"] | undefined
    >(undefined);
    if (!data) {
       return <Loading/>     
   }
     
    const deleteData = async (id: string) => {
      try {
        const response = await axios.delete("/api/listings/listing/" + id);
        if (response.status === 200) {
          toast.success("listing deleted successfully");
    setTimeout(() =>window.location.href = '')
        
        }
      } catch (error) {
        console.error(error);
        toast.error("error updating listing");
      }
    };

  return (
    <div className='w-10/12 mx-auto'> 
      <div className=" max-sm:w-11/12 w-10/12  mx-auto mt-20 ">
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
              {data
                ? data.map((listing: Listing) => (
                    <TableRow
                      key={listing.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="left">
                        {listing.title}
                      </TableCell>
                      <TableCell align="left">{listing.state}</TableCell>
                      <TableCell align="left">{listing.price}</TableCell>
                      <TableCell align="left">
                        <Button
                          color="warning"
                          variant="contained"
                          className="bg-orange-500"
                          LinkComponent="a"
                          onClick={() => {
                            setLayout("center");
                            setListing(listing)
                          }}
                         
                        >
                          Edit
                        </Button>{" "}
                        <Button
                          color="error"
                          variant="contained"
                          type="button"
                        className="bg-rose-700"
                        onClick={()=> deleteData(listing.id)}
                          //   onClick={() => submit(plan)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : ""}
            </TableBody>
          </Table>
        </TableContainer>
        <EditListing layout={layout} setLayout={setLayout} listing={listing as Listing}/>
      </div>
    </div>
  );
}

export default Page