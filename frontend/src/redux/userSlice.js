import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    otherUsers: null,
    selectedUser: null,
    searchedUsers: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setSearchedUsers: (state, action) => {
      state.searchedUsers = action.payload;
    },
  },
});

export const { setAuthUser, setOtherUsers, setSelectedUser, setSearchedUsers } =
  userSlice.actions;
export default userSlice.reducer;
