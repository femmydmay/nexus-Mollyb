'use client'
import * as React from "react";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog, { ModalDialogProps } from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import SelectedGrid from "./SelectedGrid";
import UploadModal from "./UploadModal";
import { Fetcher } from "@/types/fetch";
import useSWR from "swr";
import axios from "axios";
import Loading from "./Loading";
import { Uploads } from "@prisma/client";
const fetcher: Fetcher = (url) =>
  axios
    .get(url as string)
    .then((res) => res.data);
export default function Upload() {
  const [layout, setLayout] = React.useState<
    ModalDialogProps["layout"] | undefined
  >(undefined);

  const [selectedImages, setSelectedImages] = React.useState<Uploads[]>([]);
  const [selectedVideos, setSelectedVideos] = React.useState<Uploads[]>([]);
    const [selectedItem, setSelectedItem] = React.useState<"Videos" | "Images">(
      "Images"
    );
  const [open, setOpen] = React.useState<boolean>(false);
    const { data, isLoading, error, mutate } = useSWR(
      `/api/uploads`,
      fetcher
    );




  const files = data as Uploads[]
  if (error || isLoading) {
    return  <Loading/>
  }



 


  const handleImageCheckboxChange = (image: Uploads) => {
    if (selectedImages.includes(image)) {
      setSelectedImages((prevSelectedImages) =>
        prevSelectedImages.filter((selectedImage) => selectedImage !== image)
      );
    } else {
      setSelectedImages((prevSelectedImages) => [...prevSelectedImages, image]);
    }
  };

  const handleVideoCheckboxChange = (video: Uploads) => {
    if (selectedVideos.includes(video)) {
      setSelectedVideos((prevSelectedVideos) =>
        prevSelectedVideos.filter((selectedVideo) => selectedVideo !== video)
      );
    } else {
      setSelectedVideos((prevSelectedImages) => [...prevSelectedImages, video]);
    }
  };

  return (
    <React.Fragment>
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => {
            setLayout("center");
          }}
        >
          Center
        </Button>
      </Stack>
      <Modal open={!!layout} onClose={() => setLayout(undefined)}>
        <ModalDialog layout={layout} sx={{ width: "80%" }}>
          <ModalClose />
          <DialogTitle>Media Files</DialogTitle>
          <DialogContent>
            <ul
              role="tablist"
              className="w-full border-b  sticky top-0 bg-gray-900 z-10 border-gray-200/10 flex items-center gap-x-3 overflow-x-auto"
            >
              <li
                className={`py-2 border-b-1 ${
                  selectedItem == "Images"
                    ? "border-orange-600 border-b-2 text-gray-100  "
                    : " text-gray-500"
                }`}
              >
                <button
                  role="tab"
                  aria-selected={selectedItem == "Images" ? true : false}
                  aria-controls={`tabpanel-Images`}
                  className="py-2.5 px-4 rounded-lg duration-150 hover:text-gray-100     font-medium"
                  onClick={() => setSelectedItem("Images")}
                >
                  Images
                </button>
              </li>
              <li
                className={`py-2 border-b-1 ${
                  selectedItem == "Videos"
                    ? "border-orange-600 border-b-2 text-gray-100  "
                    : " text-gray-500"
                }`}
              >
                <button
                  role="tab"
                  aria-selected={selectedItem == "Videos" ? true : false}
                  aria-controls={`tabpanel-Videos`}
                  className="py-2.5 px-4 rounded-lg duration-150 hover:text-gray-100     font-medium"
                  onClick={() => setSelectedItem("Videos")}
                >
                  Videos
                </button>
              </li>
            </ul>
            <SelectedGrid
              images={files.filter(file => file.upload_type === "Image")}
              handleImageCheckboxChange={handleImageCheckboxChange}
              selected={selectedItem}
              selectedImages={selectedImages}
              handleVideoCheckboxChange={handleVideoCheckboxChange}
              selectedVideos={selectedVideos}
              videos={files.filter(file => file.upload_type === "Video")}
            />
            <UploadModal open={open} setOpen={setOpen} />
            <div className="grid gap-2 mt-3">
              <button
                className="w-full bg-rose-600 hover:bg-rose-500 text-white rounded-md py-2 hover:"
                onClick={() => setOpen(true)}
              >
                Upload Files
              </button>
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-md py-2 hover:">
                Select Files
              </button>
            </div>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
