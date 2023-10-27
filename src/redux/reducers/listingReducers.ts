import { Listing } from "@prisma/client";
import { createReducer, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";


export const findListingByCategory = createAsyncThunk('listing/findByCategory', async (category: string) => {
    try {
        const response = await axios.post('/api/listings/category/', { category })
        return response.data as Listing[]
    } catch (e) {
         const error = e as AxiosError<{ message: string }>;

         if (error.response && error.response.status !== 401) {
           toast.error(error.response?.data.message as string);
         }
        
    }
})

export const searchListing = createAsyncThunk(
  "listing/searchListing",
  async (data: {type:string,search:string, property_type: string, price:string, state:string}) => {
    try {
      const response = await axios.post("/api/listings/search/", data);
      return response.data as Listing[];
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;

      if (error.response && error.response.status !== 401) {
        toast.error(error.response?.data.message as string);
      }
    }
  }
);


export const findAllListings = createAsyncThunk('listings/all', async() => { 
    try {
      const response = await axios.get("/api/listings");
      return response.data as Listing[];
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;

    //   if (error.response && error.response.status !== 401) {
    //     toast.error(error.response?.data.message as string);
    //   }
    }
})



const initialState = {
listings: [] as Listing[] 
}

export const listingReducers = createReducer(initialState, (builder) => {
    builder.addCase(findListingByCategory.fulfilled, (state, action) => {
        if (action.payload) {
            state.listings =  action.payload
        }
    }).addCase(findAllListings.fulfilled, (state, action) => { 
         if (action.payload) {
           state.listings = action.payload;
         }
    }).addCase(searchListing.fulfilled, (state, action) => { 
       if (action.payload) {
         state.listings = action.payload;
       }
    })
})