"use client";

import Slider from "react-slick";

import { Grid } from "@mui/joy";
import React, { useEffect, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Fetcher } from "@/types/fetch";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { Listing } from "@prisma/client";
import NotFound from "@/components/NotFound";


interface List extends Listing {
  Uploads: Array<{ id: string; url: string }>;
}
const fetcher: Fetcher = (...args) => fetch(...args).then((res) => res.json());
const Page = () => {
  const { id } = useParams();

  const { data, error } = useSWR(`/api/listings/listing/${id}`, fetcher);
  const details = data as List;
  const desref = useRef<HTMLDivElement | null>(null);
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
  };


  useEffect(() => {
    if (desref.current) {
      desref.current.innerHTML = details.description as string; 
    }
  }, [data]);

  if (error) {
    return <NotFound />;
  }

  return (
    <>
      {data && (
        <Grid container justifyContent="center" spacing={3} paddingTop={5}>
          <Grid xs={10}>
            <div className="bg-white flex justify-between items-center p-2">
              <div>
                <h2 className="font-bold text-2xl">{details.title}</h2>
                <p> {details.address}</p>
              </div>
              <p className="text-rose-800 font-bold">Call for Price</p>
            </div>

            <div className="bg-slate-200 my-4 h-[30rem]">
              <div>
                <Slider {...settings}>
                  {details.Uploads.map((image, index) => (

                    <div className="h-[30rem]" key={image.id}>
                      <img
                        src={image.url}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>

            <div className="pb-4 bg-white">
              <div className="p-2 bg-slate-900">
                <h2 className="font-bold text-white">Property Details</h2>
              </div>
              <hr />

              <div className="grid grid-cols-2 gap-5">
                <div className="p-5 border-r">
                  <article className="flex justify-between">
                    <p>Advert Type</p>
                    <p>{details.advert_type}</p>
                  </article>
                  <article className="flex justify-between">
                    <p>Property</p>
                    <p>{details.property_type}</p>
                  </article>
                  <article className="flex justify-between">
                    <p>Bedrooms</p>
                    <p>{details.bedrooms && 'nill'}</p>
                  </article>
                  <article className="flex justify-between">
                    <p>Bathrooms</p>
                    <p>{details.bathrooms && 'nill'}</p>
                  </article>
                  <article className="flex justify-between">
                    <p>Toilets</p>
                    <p>{details.toilets}</p>
                  </article>
                </div>
                <div className="p-5">
                  <article className="flex justify-between">
                    <p>Year built</p>
                    <p>{details.year_built}</p>
                  </article>
                  <article className="flex justify-between">
                    <p>Market status</p>
                    <p>{details.market_status}</p>
                  </article>
                  <article className="flex justify-between">
                    <p>Location</p>
                    <p>{details.address}</p>
                  </article>
                </div>
              </div>
            </div>
            <div className="pb-4 my-4 bg-white">
              <div className="p-2 bg-slate-900 text-white">
                <h2 className="font-bold">Agent Contacts</h2>
              </div>
              <hr />
              <div>
                <div className="p-2 space-y-3">
                  <div className="text-">
                    <span className="font-bold capitalize mr-1">Email:</span>
                    {data.user.email}
                  </div>
                  <div className="text-">
                    <span className="font-bold capitalize mr-1">
                      Phone number:
                    </span>
                    {data.user.phone_no}
                  </div>
                  <div className="text-">
                    <span className="font-bold capitalize mr-1">
                      whatsapp number:
                    </span>
                    {data.user.whatsapp_no}
                  </div>

                </div>
              </div>
            </div>

            <div className="min-h-[10rem] mb-4 bg-white">
              <div className="p-2  bg-slate-900 text-white">
                <h2 className="font-bold ">Description</h2>
              </div>
              <hr />
              <div ref={desref} className="p-2"></div>
            </div>

            <div className="p-10 my-4 bg-white">
              <div className="p-2">
                <h2>Contact Agent</h2>
              </div>
              <hr />
              <form action="#" className="space-y-8 mt-2">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Your name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                      placeholder="name@abc.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Phone Number or Whatsapp Number
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                    placeholder="07012345678"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    Your message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Leave a comment..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="py-3 px-5 text-sm  font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Send message
                </button>
              </form>
            </div>
          </Grid>
        </Grid>
      )}

      <div className="">
        <section>
          <div>
            <img src="" alt="" />
          </div>
        </section>
      </div>
    </>
  );
};

export default Page;
