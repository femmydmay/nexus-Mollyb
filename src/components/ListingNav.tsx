'use client'
import { Option, Select, selectClasses } from "@mui/joy";

import React, { useCallback } from "react";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { priceOptions, propertyType } from "@/utils/data";
import { Button } from "@mui/material";
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation";
interface SearchParams extends ReadonlyURLSearchParams {
  size: number;
}
const ListingNav = () => {
    const params = useSearchParams()
    const route  =  useRouter()
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const searchparams = new URLSearchParams(params as SearchParams);

      searchparams.set(name, value);

      return searchparams.toString();
    },
    [params]
  );
 
  return (
    <div>
      <div className="bg-slate-800 h-20 grid items-center sticky top-0 z-20">
        <form
          action=""
          className="grid grid-cols-5 gap-3 w-[80%] mx-auto items-center"
        >
          <input
            type="text"
            placeholder="eg, lagos, abuja"
            className="rounded-md"
            onChange={(event) => {
              const x = createQueryString(
                "state",
                event.target.value as string
              );

              route.push(`/listings?${x}`);
            }}
          />

          <Select
            placeholder="Select..."
            indicator={<KeyboardArrowDown />}
            sx={{
              [`& .${selectClasses.indicator}`]: {
                transition: "0.2s",
                [`&.${selectClasses.expanded}`]: {
                  transform: "rotate(-180deg)",
                },
              },
            }}
            onChange={(event, value) => {
              const x = createQueryString("type", value as string);

              route.push(`/listings?${x}`);
            }}
          >
            <Option value="for rent">Rent</Option>
            <Option value="for sale">Buy</Option>
          </Select>
          <Select
            placeholder="Select property Type"
            indicator={<KeyboardArrowDown />}
            sx={{
              [`& .${selectClasses.indicator}`]: {
                transition: "0.2s",
                [`&.${selectClasses.expanded}`]: {
                  transform: "rotate(-180deg)",
                },
              },
            }}
            onChange={(event, value) => {
              const x = createQueryString("property-type", value as string);

              route.push(`/listings?${x}`);
            }}
          >
            <Option value="all">all</Option>
            {propertyType.map((property) => {
              return (
                <Option value={property.value} key={property.value}>
                  {property.label}
                </Option>
              );
            })}
          </Select>
          <Select
            placeholder="Select..."
            indicator={<KeyboardArrowDown />}
            sx={{
              [`& .${selectClasses.indicator}`]: {
                transition: "0.2s",
                [`&.${selectClasses.expanded}`]: {
                  transform: "rotate(-180deg)",
                },
              },
            }}
            onChange={(event, value) => {
              const x = createQueryString("price", value as string);

              route.push(`/listings?${x}`);
            }}
          >
            {priceOptions.map((price) => {
              return (
                <Option value={price.value} key={price.value}>
                  {price.label}
                </Option>
              );
            })}
          </Select>

          <div>
            <Button
              type="submit"
              variant="contained"
              className="bg-primary hover:bg-primary/80"
            >
              Search
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListingNav;
