import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
  {
    id: "1",
    name: "Peter Gomez",
    email: "peter@gmail.com",
    github: "peterDoe",
  },
  {
    id: "2",
    name: "Alexander Ramirez",
    email: "chikis@gmail.com",
    github: "alexanerchiquito",
  },
  {
    id: "3",
    name: "Shar Gomez",
    email: "gomez@gmail.com",
    github: "harol",
  },
];

export type UserId = string;

export interface User {
  name: string;
  email: string;
  github: string;
}

export interface UserWithId extends User {
  id: UserId;
}

const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem("__redux__state__");
  if (persistedState) {
    return JSON.parse(persistedState).users;
  }
  return DEFAULT_STATE;
})();

export const userSlice = createSlice({
  name: "users",
  initialState,
  //Reducers son los que van a gestionar las partes de estado
  reducers: {
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload;
      return state.filter((user) => user.id !== id);
    },
  },
});

export default userSlice.reducer;
export const { deleteUserById } = userSlice.actions;