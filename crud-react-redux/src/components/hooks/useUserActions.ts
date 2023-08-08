import { UserId, addNewUser, deleteUserById } from "../../store/users/Slice";
import { useAppDispatch } from "./store";

export const useUserActions = () => {
     //Con esto recupero la forma de enviar las acciones
  const dispatch = useAppDispatch();

  const addUser = ({ name, email, github }) => {
    dispatch(addNewUser({ name, email, github }))
  }

  const removeUser = (id: UserId) => {
    dispatch(deleteUserById(id))
  }

  return { addUser, removeUser }
}