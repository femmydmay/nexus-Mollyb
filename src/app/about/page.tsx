import MainLayout from "@/components/MainLayout";

import React from "react";

const Page = () => {

  return (
    <MainLayout>
      <main>
        <section className="relative bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-white/25  sm:from-white/90 sm:to-blue-600/25 sm:bg-gradient-to-r  h-full w-full "></div>

          <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8 justify-center">
            <div className="max-w-4xl leading-[3rem] text-center sm:text-center ">
              <h1 className="text-3xl font-extrabold sm:text-5xl">
                Navigating Nigeria&apos;s Real Estate Made Easy
              </h1>
              <strong className=" text-2xl ml-3 font-extrabold text-rose-700">
                Your Trusted and Intelligent Property Companion
              </strong>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className=" px-20 mb-3">
            <h2 className="font-bold text-2xl border-b mb-3 text-rose-700 italic">
              Welcome to Nexus - Your Ultimate Online Real Estate Portal
            </h2>

            <article>
              <p className="text-md">
                At Nexus, we are dedicated to revolutionizing the way you
                navigate Nigeria&apos;s real estate market. Whether you&apos;re a home
                owner, property buyer, seller, renter, real estate professional,
                investor, or mortgage institution, our platform is designed to
                cater to all your real estate needs.
              </p>
            </article>
          </div>
          <div className=" px-20 mb-3">
            <h2 className="font-bold text-2xl border-b mb-3 text-rose-700 italic">
              Empowering Informed Property Decisions
            </h2>

            <article>
              <p className="text-md">
                Our primary goal is to empower you with the data and tools you
                need to make informed property decisions. We understand that the
                process of buying, selling, or renting a property can be
                overwhelming, and that&apos;s why we&apos;ve created a comprehensive
                platform to guide you through every step of your real estate
                journey.
              </p>
            </article>
          </div>
          <div className=" px-20 mb-3">
            <h2 className="font-bold text-2xl border-b mb-3 text-rose-700 italic">
              Discover, Connect, and Simplify
            </h2>

            <article>
              <p className="text-md">
                From finding your dream property to connecting with local real
                estate professionals or securing a mortgage, Nexus offers an
                ever-evolving platform that makes real estate hunting smarter,
                easier, and more rewarding. Our innovative tools and intelligent
                data ensure that you have all the vital information at your
                fingertips.
              </p>
            </article>
          </div>
          <div className=" px-20 mb-3">
            <h2 className="font-bold text-2xl border-b mb-3 text-rose-700 italic">
              Eliminating Stress and Fostering Transparency
            </h2>

            <article>
              <p className="text-md">
                We believe in eliminating the stress and hassles of finding
                property in Nigeria. Transparency is at the core of our values,
                and we strive to make the real estate sector more open and
                accessible. With Nexus, you can explore a wealth of information
                about homes and real estate, ensuring you have everything you
                need to make the right choices.
              </p>
            </article>
          </div>
        </section> 

        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <div>
              <p className="inline-block px-3 py-px mb-4 font-semibold tracking-wider text-rose-600 uppercase text-xl rounded-full bg-teal-accent-400">
                Our Core Values
              </p>
            </div>
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
              <span className="relative inline-block">
                <svg
                  viewBox="0 0 52 24"
                  fill="currentColor"
                  className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                >
                  <defs>
                    <pattern
                      id="ea469ae8-e6ec-4aca-8875-fc402da4d16e"
                      x="0"
                      y="0"
                      width=".135"
                      height=".30"
                    >
                      <circle cx="1" cy="1" r=".7" />
                    </pattern>
                  </defs>
                  <rect
                    fill="url(#ea469ae8-e6ec-4aca-8875-fc402da4d16e)"
                    width="52"
                    height="24"
                  />
                </svg>
              </span>{" "}
              Guiding Your Real Estate Journey
            </h2>
          </div>
          <div className="grid gap-8 row-gap-10 lg:grid-cols-2">
            <div className="max-w-md sm:mx-auto sm:text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-50 sm:mx-auto sm:w-24 sm:h-24">
                <svg
                  className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
                  stroke="currentColor"
                  viewBox="0 0 52 52"
                >
                  <polygon
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                  />
                </svg>
              </div>
              <h6 className="mb-3 text-xl font-bold leading-5">Transparency</h6>
              <p className="mb-3 text-sm text-gray-900">
                We believe in fostering openness and honesty throughout your
                real estate experience. Our commitment to transparency ensures
                that you have access to accurate and reliable information,
                empowering you to make well-informed decisions confidently.
              </p>
            </div>
            <div className="max-w-md sm:mx-auto sm:text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-50 sm:mx-auto sm:w-24 sm:h-24">
                <svg
                  className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
                  stroke="currentColor"
                  viewBox="0 0 52 52"
                >
                  <polygon
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                  />
                </svg>
              </div>
              <h6 className="mb-3 text-xl font-bold leading-5">
                Customer-Centric
              </h6>
              <p className="mb-3 text-sm text-gray-900">
                You, our valued customer, are at the heart of everything we do.
                Your satisfaction and success in your real estate endeavors are
                our top priorities. We strive to provide exceptional service,
                tailored to meet your unique needs, and we actively listen to
                your feedback to continually improve our offerings.
              </p>
            </div>
            <div className="max-w-md sm:mx-auto sm:text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-50 sm:mx-auto sm:w-24 sm:h-24">
                <svg
                  className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
                  stroke="currentColor"
                  viewBox="0 0 52 52"
                >
                  <polygon
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                  />
                </svg>
              </div>
              <h6 className="mb-3 text-xl font-bold leading-5">
                Trustworthiness
              </h6>
              <p className="mb-3 text-sm text-gray-900">
                Building trust is paramount to us. We aim to be your trusted
                partner throughout your real estate journey. Count on us to
                deliver on our promises, and to be there for you every step of
                the way, providing reliable support and guidance.
              </p>
            </div>
            <div className="max-w-md sm:mx-auto sm:text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-50 sm:mx-auto sm:w-24 sm:h-24">
                <svg
                  className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
                  stroke="currentColor"
                  viewBox="0 0 52 52"
                >
                  <polygon
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                  />
                </svg>
              </div>
              <h6 className="mb-3 text-xl font-bold leading-5">Innovation</h6>
              <p className="mb-3 text-sm text-gray-900">
                Embracing innovation drives us to constantly improve and evolve.
                We utilize cutting-edge technology to create a user-friendly
                platform that simplifies and enhances your real estate
                experience. By staying at the forefront of industry
                advancements, we offer you innovative solutions to meet your
                changing needs.
              </p>
            </div>
          </div>
          <div>
            <h2 className="bg-slate-900 text-white mt-6 p-4 text-2xl font-bold">
              ABOUT NEXUS CLASSIC PROPERTIES
            </h2>
            <article className="space-y-10 leading-relaxed mt-4">
              <p className="whitespace-pre-wrap text-lg">
                Hi there!, Selling a home or renting can be an exciting venture,
                however it can also be an emotional, or even stressful,
                experience. Nexus Classic Properties understand and empathize
                with what you may be feeling during this process. In our
                experience, the best way to manage uncertainty is to arm
                yourself with knowledge!
                <p className="mt-4">
                  That’s why we provide small pieces of information to prepare
                  you for each step of your home selling journey. For even more
                  in-depth information, check out our Buy and sell pages. We
                  will give you value and quality for your money.
                </p>
              </p>
            </article>
          </div>
        </div>
      </main>
    </MainLayout>
  );
};

export default Page;
