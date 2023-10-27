import React from 'react'
import { Dialog } from "@headlessui/react";
import { Button } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  id: string;
  msg: string;
  title: string;
  description: string;
  handleclick:(id:string)=> Promise<void>;
}
const FlashAlert = ({ open, setOpen, id, msg, title, description, handleclick }: Props) => {

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto ">
        <Dialog.Panel className="bg-white shadow-md rounded p-3 md:w-1/2 ">
          <Dialog.Title className="text-2xl my-3 text-center text-yellow-700 font-bold">{title}</Dialog.Title>
          <Dialog.Description className="text-l">
  {description}
          </Dialog.Description>

          <p>
      {msg}
          </p>

          <div className="flex justify-end gap-3"> 

          <Button onClick={()=>handleclick(id)} variant="outlined">Continue</Button>
          <Button onClick={() => setOpen(false)} variant='contained' color='error' className='bg-rose-600'>Cancel</Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default FlashAlert