import { createContext, ReactNode, useContext, useState } from "react";
import { useQuery } from "react-query";
import { IUser } from "../types/user";
import { getUser } from "../utils/getUser";

interface IUserContext {
  user: IUser;
  handleClickNextButton: () => void;
  handleClickPrevButton: () => void;
}

const UserQueryContext = createContext({} as IUserContext);

export const UserQueryProvider = ({ children }: { children: ReactNode }) => {
  const [currentId, setCurrentId] = useState(1);

  const { data, isError, isLoading } = useQuery(
    ["user", currentId],
    () => getUser(currentId),
    {
      staleTime: 5000,
    }
  );

  const handleClickNextButton = () => {
    setCurrentId((id) => id + 1);
  };

  const handleClickPrevButton = () => {
    setCurrentId((id) => (id <= 1 ? id : id - 1));
  };

  if (isError) {
    return <section>Algo deu errado</section>;
  }

  if (!data || isLoading) {
    return <section>Loading...</section>;
  }

  return (
    <UserQueryContext.Provider
      value={{
        user: data,
        handleClickNextButton,
        handleClickPrevButton,
      }}
    >
      {children}
    </UserQueryContext.Provider>
  );
};

export const useUserQuery = () => useContext(UserQueryContext);
