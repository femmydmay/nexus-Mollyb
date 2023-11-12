import Image from "next/image";

import Link from "next/link";

import HeroSearchForm from "@/components/HeroSearchForm";

import GetProducts from "@/components/GetProducts";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import MainLayout from "@/components/MainLayout";

export default async function Home() {
  return (
    <MainLayout>
      <main className="bg-white/95">
        <section className="relative bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-white/45  sm:from-white/95 sm:to-white/25 sm:bg-gradient-to-r  h-full w-full "></div>
          <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8 justify-center">
            <div className="max-w-xl text-center sm:text-center ">
              <h1 className="text-3xl font-extrabold text-slate-900 sm:text-5xl">
                <strong className=" ml-3 font-extrabold text-primary">
                  Nexus MollyBW
                </strong>
              </h1>

              <p className="mt-4 max-w-lg text-white font-bold sm:text-xl/relaxed ">
                Your Trusted Search For Credible Real Estate
              </p>

              <div className="mt-8 w-full text-center  space-y-5">
                <p className="text-2xl font-bold text-white ">
                  BUY, SELL, RENT HOUSES AND PURCHASE LAND
                </p>
                <HeroSearchForm />
              </div>
            </div>
          </div>
        </section>

        <section className="p-5 ">
          <Suspense fallback={<Loader />}>
            <GetProducts />
          </Suspense>
          <section>
            <div className="grid md:grid-cols-2 gap-2 ">
              <article className=" bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8">
                <div className="flex items-center sm:gap-8 ">
                  <Image
                    src="/search.png"
                    width={100}
                    height={100}
                    alt="search image"
                  />

                  <div>
                    <h3 className="mt-4 text-lg text-black font-medium sm:text-xl">
                      <Link href="" className="hover:underline">
                        Property Request Posting
                      </Link>
                    </h3>

                    <p className="mt-1 text-sm text-gray-700">
                      Easily post property for rent or sale on our user-friendly
                      site with real-time information. Our property search
                      results are quick and accurate, tailored to your exact
                      needs. Make informed decisions for buying or renting
                      property armed with honest and relevant information..
                    </p>
                    <div>
                      <button className="block  rounded bg-primary text-white py-2 px-4 text-sm font-medium transition hover:scale-105 float-right">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </article>
              <article className=" bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8">
                <div className="flex items-center sm:gap-8 ">
                  <Image
                    src="/search.png"
                    width={100}
                    height={100}
                    alt="search image"
                  />

                  <div>
                    <h3 className="mt-4 text-black  text-lg font-medium sm:text-xl">
                      <Link href="" className="hover:underline">
                        Agent Vetting on Our Platform
                      </Link>
                    </h3>

                    <p className="mt-1 text-sm text-gray-700">
                      At our platform, we thoroughly vet real estate agents to
                      ensure reliability and professionalism. We connect you
                      with reputable local agents who will assist you in finding
                      the perfect property.
                    </p>
                  </div>
                </div>
              </article>
            </div>
            <article>
              <div className="w-11/12 grid mx-auto py-20 w-full h-full gap-9s z-10 bg-[#f7f9fc]">
                <section className="w-full">
                  <h3 className="text-slate-800 text-5xl text-center   my-3">
                    NEXUS MollyBW
                  </h3>
                  <article className="text-slate-900 text-xl text-center leading-[3rem]">
                    Hi there!, Selling a home or renting can be an exciting
                    venture, however it can also be an emotional, or even
                    stressful, experience. <br />
                    Nexus Classic understand and empathize with what you may be
                    feeling during this process. <br />
                    In our experience, the best way to manage uncertainty is to
                    arm yourself with knowledge! <br />
                    We provide small pieces of information to prepare you for
                    each step of your home selling journey.
                    <br /> For even more in-depth information, check out our Buy
                    and sell pages.
                  </article>
                  <article className="text-slate-00 text-center  text-xl leading-[3rem]">
                    We will give you value and quality for your money.
                  </article>
                  <p className="text-slate-900  text-center  text-xl leading-[3rem]">
                    {" "}
                    You will enjoy our site experience.
                  </p>
                </section>

                <div className="mt-3 mx-auto ">
                  {/* <button className="bg-slate-300 ml-30 font-bold px-1 py-2 text-slate-900 rounded hover:bg-green-200 hover:text-red-900">
              Contact Us
            </button> */}
                </div>
              </div>
              {/* Evelyn Omolara Memorium */}

              <section className="min-h-[60vh] w-10/12   mx-auto py-24 lg:py-28 overflow-hidden">
                <h2 className="text-slate-800 font-bold mt-20 uppercase mb-20  text-[1.5rem] font-cde text-center">
                  I am dedicating this Project to the memory of our mother,
                  <br />
                  Mrs. Evelyn Omolara Wilson a.k.a MollyBW. Who passed to be
                  <br /> with the Lord recently. She was a Lover of art and
                  artist
                  <br />
                  herself. These are some of her works below. <br /> The art
                  works are for sale, please order yours.
                  <br />
                  They come with frames.
                  <br /> Call or Whatsapp 0818-569-6269 for price and other art
                  works.
                </h2>
                <div className="container px-4 mx-auto">
                  <div className="flex flex-wrap -m-8">
                    <div className="w-full md:w-1/3 p-8">
                      <div className="max-w-xs mx-auto text-center">
                        <Image
                          className="mx-auto mb-0"
                          src="/assets/mum.jpg"
                          width={500}
                          height={500}
                          alt=""
                        />
                        <h3 className="mb-4 text-xl font-semibold tracking-tight">
                          Mrs. Evelyn Omolara Wilson
                        </h3>
                        <p className="mb-8 tracking-tight">
                          Public Relations Officer, Linguist, Art collector and
                          Artist.
                        </p>
                        {/* <a
                    className="font-semibold text-indigo-500 hover:text-indigo-600 tracking-tight transition duration-200"
                    href="#"
                  >
                    <Link href="/Business"> Go to business page</Link>
                  </a> */}
                      </div>
                    </div>
                    <div className="w-full md:w-1/3 p-8">
                      <div className="max-w-xs mx-auto text-center">
                        <Image
                          className="mx-auto mb-9"
                          src="/assets/paint1.jpg"
                          width={500}
                          height={500}
                          alt=""
                        />
                        <h3 className="mb-4 text-xl font-semibold tracking-tight">
                          TREE ART WORK 15.5 x 15.5 inches size
                        </h3>
                        <p className="mb-8 tracking-tight">
                          Just like the root of the tree supplies nutrients{" "}
                          <br />
                          to the branches so she was to us.
                        </p>
                        <a
                          className="font-semibold text-indigo-500 hover:text-indigo-600 tracking-tight transition duration-200"
                          href="#"
                        >
                          <p>Call or Whatsapp 0818-569-6269 for price </p>
                        </a>
                      </div>
                    </div>
                    <div className="w-full md:w-1/3 p-8">
                      <div className="max-w-xs mx-auto text-center">
                        <Image
                          className="mx-auto mb-9"
                          src="/assets/paint2.jpg"
                          width={500}
                          height={500}
                          alt=""
                        />
                        <h3 className="mb-4 text-xl font-semibold tracking-tight">
                          PEACOCK ART 26 x 21.5 inches size
                        </h3>
                        <p className="mb-8 tracking-tight">
                          Like the peacock mum was full of life and colors
                          <br />
                          She was beautiful in and out.
                        </p>
                        <a
                          className="font-semibold text-indigo-500 hover:text-indigo-600 tracking-tight transition duration-200"
                          href="#"
                        >
                          <p>Call or Whatsapp 0818-569-6269 for price </p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* mumsy paintings 2 */}
              <div className="container px-4 mx-auto">
                <div className="flex flex-wrap -m-8">
                  <div className="w-full md:w-1/3 p-8">
                    <div className="max-w-xs mx-auto text-center">
                      <Image
                        className="mx-auto mb-0"
                        src="/assets/mumsy.jpg"
                        width={500}
                        height={500}
                        alt=""
                      />
                      <h3 className="mb-4 text-xl font-semibold tracking-tight">
                        MollyBW
                      </h3>
                      <p className="mb-8 tracking-tight">
                        She was a mother to so many and loved. <br />
                        rest in the bossom of the Lord.
                      </p>
                      {/* <a
                  className="font-semibold text-indigo-500 hover:text-indigo-600 tracking-tight transition duration-200"
                  href="#"
                >
                  <Link href="/Business"> Go to business page</Link>
                </a> */}
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 p-8">
                    <div className="max-w-xs mx-auto text-center">
                      <Image
                        className="mx-auto mb-9"
                        src="/assets/paint4.jpg"
                        width={500}
                        height={500}
                        alt=""
                      />
                      <h3 className="mb-4 text-xl font-semibold tracking-tight">
                        TIGER ART WORK 24 x 15 inches size.
                      </h3>
                      <p className="mb-8 tracking-tight">
                        Like the tiger she was majestic and strong. <br />
                        An Enigma and disciplinarian.
                      </p>
                      {/* <a
                  className="font-semibold text-indigo-500 hover:text-indigo-600 tracking-tight transition duration-200"
                  href="#"
                >
                  <p>Call or Whatsapp 0818-569-6269 for price </p>
                </a> */}
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 p-8">
                    <div className="max-w-xs mx-auto text-center">
                      <Image
                        className="mx-auto mb-9"
                        src="/assets/paint3.jpg"
                        width={500}
                        height={500}
                        alt=""
                      />
                      <h3 className="mb-4 text-xl font-semibold tracking-tight">
                        TREE 15.5 X 15.5 inches size
                      </h3>
                      <p className="mb-8 tracking-tight">
                        Like the tree mama was a shade and help for many
                        <br />
                        she was philantropic and a giver.
                      </p>
                      {/* <a
                  className="font-semibold text-indigo-500 hover:text-indigo-600 tracking-tight transition duration-200"
                  href="#"
                >
                  <Link href="/Business"> Go to business page</Link>
                </a> */}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </section>
        </section>
      </main>
    </MainLayout>
  );
}
