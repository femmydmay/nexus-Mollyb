
import { uploadMultipleFiles } from "@/utils/fetch";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";

import Sheet from "@mui/joy/Sheet";
import { FormEvent, useRef, useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";

export default function UploadModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Function;
  }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null) 
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);

    const files = event.dataTransfer.files;
    handleFiles(files);
  };
 const isImageOrVideo = (file: File) => {
   const allowedTypes = ["image/jpeg", "image/png",  "video/mp4", "video/avi"];
   return allowedTypes.includes(file.type);
 };
  
  const isFileSizeValid = (file: File, maxSizeInKB:number) => {
    return file.size <= maxSizeInKB * 1024;
  };
  
  const handleFiles = (files: FileList | null) => {
    if (files && files.length > 0) {
  
   
   const validFiles = Array.from(files).filter(
     (file) =>
       isImageOrVideo(file) &&
       isFileSizeValid(file, file.type.startsWith("image") ? 1000 : 5000)
   );
         setSelectedFiles(validFiles);
       
      // You can perform further processing on the dropped files here
    }
  };

  
  
  const onUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
        const validFiles = Array.from(files).filter(
          (file) =>
            isImageOrVideo(file) &&
            isFileSizeValid(file, file.type.startsWith("image") ? 1000 : 5000)
        );
          setSelectedFiles(validFiles);
        }
  }



  const onSubmit = async (event: FormEvent) => { 
    event.preventDefault()
    
const res = await uploadMultipleFiles(selectedFiles, '/api/uploads');
  }
  return (
    <>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: "90dvw",
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <form className="mt-8 space-y-3" onSubmit={onSubmit}>
            <div
              className="grid grid-cols-1 space-y-2"
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                Upload media
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                  <div className="h-full w-full text-center flex flex-col items-center justify-center  ">
                    <AiOutlineUpload size={40} />

                    <p className="pointer-none text-gray-500 ">
                      <span className="text-sm">Drag and drop</span> files here{" "}
                      <br /> or{" "}
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        id=""
                        className="text-blue-600 hover:underline mr-2"
                      >
                        select a file
                      </button>
                      from your computer
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={onUpload}
                    ref={fileRef}
                    multiple
                    accept="image/*, video/mp4"
                  />
                </label>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              <span>File type: types of images and types of videos</span>
            </p>
            <div>
              <button
                type="submit"
                className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
              >
                Upload
              </button>
            </div>
          </form>
          <div>
            {selectedFiles.length > 0 && (
              <div>
                <h3 className="font-bold">Selected Files:</h3>
                <ul className="p-2 space-y-2">
                  {selectedFiles.map((file, index) => (
                    <li key={index} className="list-decimal">{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Sheet>
      </Modal>
    </>
  );
}
