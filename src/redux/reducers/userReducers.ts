import { User } from "@prisma/client";
import { createAction, createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

interface UserInterface extends User{
  plan: {
  title: string
}
}
const initialState = {
  user: null as UserInterface | null,
  isFetching: false,
  loading: true,
  users:[] as User[]
}; 


interface UserApi{
  getState: ()=>{[userReducers:string]: any}
}
export const getUser = createAsyncThunk(
  "getUser",
  async (_, thunkApi) => {

     const { getState } = thunkApi as UserApi;
    const { isFetching } = getState()?.userReducers;
    
     if (isFetching) {
       return getState().userReducers.user;
     }
    try {
      thunkApi.dispatch(setFetching(true));
      const result = await axios.get<User>("/api/users/user");
      return result.data;
    } catch (e) {
   
      const error = e as AxiosError<{ message: string }>;

      if (error.response && error.response.status !== 401) {
        toast.error(error.response?.data.message as string);
      }
    } finally {
      // thunkApi.dispatch(setFetching(false)); // Set fetching flag to false
    }
  }
);

export const getUsers = createAsyncThunk("getUsers", async (_, thunkApi) => {
 
  try {

    const result = await axios.get<User[]>("/api/users");
    return result.data;
  } catch (e) {
    const error = e as AxiosError<{ message: string }>;

    if (error.response && error.response.status !== 401) {
      toast.error(error.response?.data.message as string);
    }
  } 
});


export const setFetching = createAction<boolean>("setFetching");
export const emptyUser = createAction("emptyUser");

export const userReducers = createReducer(initialState, (builder) => {
  builder
    .addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload as UserInterface;
      state.loading = false
    })
    .addCase(setFetching, (state, action) => {
      state.isFetching = action.payload;
    }).addCase(emptyUser, (state, action) => { 
      state.user = {} as UserInterface;
    }).addCase(getUsers.fulfilled, (state, action) => { 
      state.users = action.payload as User[]
    })
})
