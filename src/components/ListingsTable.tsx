import { toast } from "react-hot-toast";
import Loader from "./Loader";
import { Fetcher } from "@/types/fetch";
import useSWR from "swr";
import React, { Dispatch, SetStateAction, useState } from "react";

import axios from "axios";

import { Listing } from "@prisma/client";
import { Button, TableCell, TableRow } from "@mui/material";
const fetcher: Fetcher = (url) =>
  axios.get(url as string).then((res) => res.data);

const ListingsTable = ({setLayout, setListing}: {
  setLayout: Dispatch<SetStateAction<"center" | "fullscreen" | undefined>>;
setListing: Dispatch<SetStateAction<Listing | null>>}) => {
  const { data, isLoading, error, mutate } = useSWR(
    "/api/users/user/listings",
    fetcher
  );

  if (!data) {
    return <Loader />;
  }

  const deleteData = async (id: string) => {
    try {
      const response = await axios.delete("/api/listings/listing/" + id);
      if (response.status === 200) {
        toast.success("listing deleted successfully");
        setTimeout(() => (window.location.href = ""));
      }
    } catch (error) {
      console.error(error);
      toast.error("error updating listing");
    }
  };
  return (
    <>
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
                    setListing(listing);
                  }}
                >
                  Edit
                </Button>{" "}
                <Button
                  color="error"
                  variant="contained"
                  type="button"
                  className="bg-rose-700"
                  onClick={() => deleteData(listing.id)}
                  //   onClick={() => submit(plan)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))
        : ""}
    </>
  );
};

export default ListingsTable;
