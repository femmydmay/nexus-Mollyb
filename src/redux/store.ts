import { listingReducers } from './reducers/listingReducers';
import { configureStore } from "@reduxjs/toolkit";
import { authReducers } from "./reducers/authReducers";
import { userReducers } from "./reducers/userReducers";
export const store = configureStore({
  reducer: {
    authReducers,
    userReducers,
    listingReducers
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
