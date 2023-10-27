import { Box } from "@mui/material";
import axios, { AxiosProgressEvent } from "axios";
import React, { ChangeEvent, MouseEventHandler, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog, { ModalDialogProps } from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";

import { Fetcher } from "@/types/fetch";
import useSWR from "swr";

import { Uploads } from "@prisma/client";

import { toast } from "react-hot-toast";
import Loading from "../Loading";
import SelectedGrid from "../SelectedGrid";
import UploadModal from "../UploadModal";
import { Button } from "@mui/joy";
import { BiImageAdd, BiVideoPlus } from "react-icons/bi";
import { uploadMultipleFiles } from "@/utils/fetch";

interface FilesUpload {
  previewImage: string | ArrayBuffer;
  file: File;
}
const fetcher: Fetcher = (url) =>
  axios.get(url as string).then((res) => res.data);
interface Props {
  handleNext: MouseEventHandler<HTMLButtonElement>;
  handleBack: MouseEventHandler<HTMLButtonElement>;
  steps: {
    label: string;
    Component: ({
      handleNext,
      handleBack,
      index,
      steps,
    }: Props) => React.JSX.Element;
  }[];
  index: number;
}
const Form3 = ({ handleNext, handleBack, index, steps }: Props) => {
  const [value, setValue] = useState("");
  const datalo = JSON.parse(localStorage.getItem("propertydata") as string);
  const [fileUpload, setFileUpload] = useState<FilesUpload[]>([]);

  const router = useRouter();

  const [layout, setLayout] = React.useState<
    ModalDialogProps["layout"] | undefined
  >(undefined);

  const [selectedImages, setSelectedImages] = React.useState<File[]>([]);
  const [selectedVideos, setSelectedVideos] = React.useState<File[]>([])
  const [uploads, setUploads] = React.useState<{id:string}[]>([]);
  const [selectedItem, setSelectedItem] = React.useState<"Videos" | "Images">(
    "Images"
  );
  const [open, setOpen] = React.useState<boolean>(false);

  const imgRef =  useRef<HTMLInputElement | null>(null)
  const videoRef =  useRef<HTMLInputElement | null>(null)

     const handleImageChange = (event:ChangeEvent<HTMLInputElement>) => {
       const files = event.target.files 
       const filestore:File[] = []
       if(!files) return
       if (files?.length > 0 ) {
         for (let i = 0; i < files.length; i++) { 
           filestore.push(files[i])
         }
       }

       setSelectedImages((prev) => [...prev, ...filestore])
       
     };

     const handleVideoChange = (
       event: ChangeEvent<HTMLInputElement>
     ) => {
       
 const files = event.target.files;
 const filestore: File[] = [];
 if (!files) return;
 if (files?.length > 0) {
   for (let i = 0; i < files.length; i++) {
     filestore.push(files[i]);
   }
 }

 setSelectedVideos((prev) => [...prev, ...filestore]);
     };



  const handle = async () => {

      const res = JSON.parse(localStorage.getItem("propertydata") as string);

    try {
        
      const uploaded = await uploadMultipleFiles([...selectedImages, ...selectedVideos], '/api/uploads')
      
      if (uploaded?.length  === [...selectedImages, ...selectedVideos].length) {
        
        const response = await axios.post("/api/listings/create", {
          ...res,

          description: value,

         uploads: uploaded
        });
        if (response.status === 200) {
          toast.success("listing uploaded");
          router.replace("/dashboard/listings");
        }
      }
      } catch (error) {
        console.log(error);
      }
   
  };


  const handleRemoveImage = (index: number) => {

      const updatedImages = [...selectedImages];
      updatedImages.splice(index, 1);
      setSelectedImages(updatedImages);
 
  };

 const handleRemoveVideo = (index: number)=> {
  const updatedVideos = [...selectedVideos];
  updatedVideos.splice(index, 1);
  setSelectedVideos(updatedVideos);
  }

  return (
    <section className="container">
      <div className="h-80 mt-5">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          placeholder="Description"
          className="h-60"
        />
      </div>
      {/* <hr /> */}

      <div className="space-x-5">
        <Button
          endDecorator={<BiImageAdd size={24} />}
          color="primary"
          className="bg-rose-700 hover:bg-rose-500"
          onClick={() => imgRef.current?.click()}
        >
          Upload Images
        </Button>
        <Button
          endDecorator={<BiVideoPlus size={24} />}
          color="primary"
          className="bg-blue-700 hover:bg-blue-500"
          onClick={() => videoRef.current?.click()}
        >
          Upload Videos
        </Button>

        <div>
          <SelectedGrid
           
            images={selectedImages}
            videos={selectedVideos}
            handleRemoveImage={handleRemoveImage}
            handleRemoveVideo={handleRemoveVideo}
          />
        </div>

        <input
          type="file"
          ref={imgRef}
          className="hidden"
          accept="image/png, image/gif, image/jpeg"
          onChange={handleImageChange}
          multiple
        />
        <input
          type="file"
          ref={videoRef}
          className="hidden"
          accept="video/mp4"
          multiple
          onChange={handleVideoChange}
        />
      </div>

      <Box sx={{ mb: 2 }}>
        <div>
          <Button
            className="bg-blue-800"
            onClick={handle}
            sx={{ mt: 1, mr: 1 }}
          >
            {index === steps.length - 1 ? "Submit" : "Continue"}
          </Button>
          <Button
            disabled={index === 0}
            onClick={handleBack}
            sx={{ mt: 1, mr: 1 }}
            className="bg-rose-800 hover:bg-rose-600"
          >
            Back
          </Button>
        </div>
      </Box>
    </section>
  );
};

export default Form3;
