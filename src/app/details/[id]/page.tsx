"use client";
import MainLayout from "@/components/MainLayout";
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

/* eslint-disable @next/next/no-img-element */

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
    <MainLayout>
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
                    <p>{details.bedrooms && "nill"}</p>
                  </article>
                  <article className="flex justify-between">
                    <p>Bathrooms</p>
                    <p>{details.bathrooms && "nill"}</p>
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
                  {/* <a href="#" className="socialContainer containerOne">
                    <FaPhoneSquareAlt color="white" />
                  </a> */}

                  {/* <a href="#" className="socialContainer containerTwo">
                    <svg className="socialSvg twitterSvg" viewBox="0 0 16 16">
                      {" "}
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>{" "}
                    </svg>{" "}
                  </a> */}

                  {/* <a href="#" className="socialContainer containerThree">
                    <MdOutlineMail color="white" />
                  </a> */}

                  {/* <a href="#" className="socialContainer containerFour">
                    <svg className="socialSvg whatsappSvg" viewBox="0 0 16 16">
                      {" "}
                      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path>{" "}
                    </svg>
                  </a> */}
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
    </MainLayout>
  );
};

export default Page;
