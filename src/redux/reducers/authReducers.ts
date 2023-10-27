import { User } from "@prisma/client";
import {

  createReducer,
    createAsyncThunk,
  createAction
} from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";


interface ILogin {
  email: string;
  password: string;
}
interface Auth{
  loggedin?: boolean;
  loading?: boolean;

    
}

const initialState = {
  loggedin: false,
  loading:false
} as Auth;



export const login = createAsyncThunk("getUser", async (data:ILogin) => {
  try {
    const response = await axios.post<User>("/api/login", data);
         if (response.status === 200) {
           toast.success('success')
         return  response.data;
    }
  } catch (e) {
      console.log(e);
      
      const error = e as AxiosError<{message:string}>;
      
      if (error.response) {
        toast.error(error.response?.data.message as string)

        setTimeout(() => { window.location.href = '' }, 500)
      }
  }
});

export const setLogin = createAction<Auth>('setLogin')
export const setAuthLoading = createAction<Auth>('setAuthLoading')

export const authReducers = createReducer(initialState, (builder) => {
    
    
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload) {
        
          state.loggedin = true;
          state.loading=false
      }   
    }).addCase(setLogin, (state, action) => {
        state.loggedin = action.payload.loggedin
    }).addCase(setAuthLoading, (state, action) => { 
      state.loading = action.payload.loading
    })
    

});





