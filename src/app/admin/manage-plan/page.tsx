
'use client'

import { Button, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';  
import axios, { AxiosError } from 'axios';
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import React from 'react'
import { toast } from 'react-hot-toast';

import useSWR from "swr";
import { Fetcher } from '@/types/fetch';
import { Plan } from '@/types/plan';
import AdminCheck from '@/layout/AdminCheck';




const fetcher: Fetcher = (...args) => fetch(...args).then((res) => res.json() );

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const Page = () => {
    // const host = headers().get("host");
  // const plans:Plan[] = use(getPlan())

  const { data:plans, error, isLoading } = useSWR( 
    "http://localhost:3000/api/plans",
    fetcher
  );

  if (isLoading) {
    <CircularProgress/>
  }


 


  const submit = (plan: Plan) => {
    confirmAlert({

      customUI: ({ onClose }) => {
        return (

          <Paper className="p-5">
            <h1 className="text-2xl font-bold text-orange-800">Warning!</h1>
            <Divider />
            <p className="my-3 text-lg">
              This will delete {plan.title}, do you want to proceed?
            </p>

            <div className="flex justify-between">
              <Button variant="outlined" color="warning" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                className="bg-blue-800"
                onClick={async () => {
                  try {
                    const response = await axios.delete(
                      `/api/plans/plan/${plan.id}`
                    );
                    if (response.status === 200) {
                      toast.success(response.data.message);
                      onClose();
                    }
                  } catch (error) {
                    const e = error as AxiosError<{ message: string }>;

                    if (e.response) {
                      toast.error(e?.response?.data?.message as string);
                    }
                  }
                }}
              >
                Continue
              </Button>
            </div>
          </Paper>
        );
    }})
  };

  return (
      <AdminCheck>
      
      <div className=" max-sm:w-11/12 w-8/12  mx-auto mt-20">

        
                    
        <TableContainer component={Paper}>
          <h1 className="text-2xl text-orange-800 font-bold text-center my-3">
            Plan Details
          </h1>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ fontWeight: 700, fontSize: 20 }}>
                  Title
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
              { plans?  plans.map((plan: Plan) => (
                <TableRow
                  key={plan.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="left">
                    {plan.title}
                  </TableCell>
                  <TableCell align="left">{plan.price}</TableCell>
                  <TableCell align="left">
                    <Button
                      color="warning"
                      variant="contained"
                      className="bg-orange-500"
                      LinkComponent='a'
                      // onClick={()=> setopen(true)}
                      href={`/admin/plan/${plan.id}`}
                    >
                      Edit
                    </Button>{" "}

                    <Button
                      color="error"
                      variant="contained"
                      type="button"
                      className="bg-rose-700"
                      onClick={() => submit(plan)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )): ""}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      </AdminCheck>
    );
}

export default Page