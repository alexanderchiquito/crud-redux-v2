import { createSlice } from "@reduxjs/toolkit";

export interface User {
  name: string;
  email: string;
  github: string;
}

export interface UserWithId extends User {
  id: string;
}

const initialState: UserWithId[] = [
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

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});


export default userSlice.reducer