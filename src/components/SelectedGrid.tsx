import React from "react";
import { FaTrash } from "react-icons/fa";

/* eslint-disable @next/next/no-img-element */
interface SelectedGridProps {

  videos: File[];
  images:File[]
  handleRemoveImage: (index: number) => void;
  handleRemoveVideo: (index: number) => void;
}

const SelectedGrid: React.FC<SelectedGridProps> = ({
  
  videos,
  images,
  handleRemoveImage,
  handleRemoveVideo
}) => {
  return (
    <div className="grid grid-cols-2 p-4 gap-4">
      <div>
        <h2 className="font-bold uppercase py-2">Selected Images</h2>
        <section className="grid grid-cols-4 gap-3 border-r p-2">
          {images.map((file, index) => (
            <div key={index} className="p-2 shadow space-y-3">
              {
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Image ${index}`}
                  className="w-16 h-16"
                />
              }

              <button
                onClick={() => handleRemoveImage(index)}
                className="bg-rose-600 text-white p-2 py rounded "
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </section>
      </div>
      <div>
        <h2 className="font-bold uppercase py-2">Selected Videos</h2>
        <section className="grid grid-cols-3 gap-3 p-2">
          {videos.map((file, index) => (
            <div key={index} className="border  space-y-3 p-2">
              {
                <video controls className="w-16 h-16">
                  <source src={URL.createObjectURL(file)} type="video/mp4" />
                </video>
              }

              <button
                onClick={() => handleRemoveVideo(index)}
                className="bg-rose-600 text-white p-2 py rounded"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default SelectedGrid;
