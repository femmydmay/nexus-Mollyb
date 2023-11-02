import ListingNav from "@/components/ListingNav";
import Loader from "@/components/Loader";
import ShowListings from "@/components/ShowListings";
import { Suspense } from "react";


const Page = () => {
    
  return (
    <>
      <ListingNav />

      <main className="bg-white/90 h-full flex-1  my-2 py-5 ">
        <div className="md:w-10/12 mx-auto  space-y-5 ">
          <Suspense fallback={<Loader/>}>

         <ShowListings/>
          </Suspense>

          {/* <Paper className="flex justify-between my-2 items-center p-3">
            <p>Results 1 - 15 of 7,467</p>

            <div className="flex items-center ">
              <span>sort by</span>
              <Select
                defaultValue="recent"
                indicator={<KeyboardArrowDown />}
                sx={{
                  width: 160,
                  [`& .${selectClasses.indicator}`]: {
                    transition: "0.2s",
                    [`&.${selectClasses.expanded}`]: {
                      transform: "rotate(-180deg)",
                    },
                  },
                }}
                className="rounded-0 ml-2"
              >
                <Option value="recent">recent</Option>
                <Option value="lowest">lowest price</Option>
                <Option value="highesr">highest price</Option>
              </Select>

              <BiFilter size={23} />
            </div>
          </Paper> */}
      
        </div>
      </main>
    </>
  );
}

export default Page