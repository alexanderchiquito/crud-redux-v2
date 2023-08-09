import { configureStore, type Middleware } from "@reduxjs/toolkit";
import usersReducer, { rollbackUser } from "./users/Slice";
import { toast } from "sonner";

const persistanceLocalStoregeMiddeleware: Middleware =
  (store) => (next) => (action) => {
    next(action);
    localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
  };

const syncWithDatabaseMiddeleware: Middleware = (store) => (next) => (action) => {
    const { type, payload } = action;
    const previousState = store.getState();

    // fase 1
    // console.log({ type, payload })
    // console.log(store.getState())
    next(action);

    if (type === "users/deleteUserById") { //<-- elimiando un Usuario
        const userIdToRemove = payload;
        const userToRemove = previousState.users.find(user => user.id === userIdToRemove)
      fetch(`https://jsonplaceholder.typicode.sbcshfsnhsj/users/${userIdToRemove}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            toast.success(`Usuario ${payload} eliminado correctamente`);
          }
          throw new Error('Error al eliminar el Usuario')
        })
        .catch(() => {
            toast.error(`Error deleting user ${action.userIdToRemove}`)
            if(userToRemove) store.dispatch(rollbackUser(userToRemove))
          console.log("error");
        });
    }

    // fase 2
    // console.log('fase 2')
  };

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },

  middleware: [persistanceLocalStoregeMiddeleware, syncWithDatabaseMiddeleware],
});

export type RootSate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;