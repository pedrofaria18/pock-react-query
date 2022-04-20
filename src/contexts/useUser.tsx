import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUser } from "../types/user";
import { getUser } from "../utils/getUser";

interface IUserContext {
  user: IUser;
  handleClickNextButton: () => void;
  handleClickPrevButton: () => void;
}

const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentId, setCurrentId] = useState(1);
  const [user, setUser] = useState<IUser>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleClickNextButton = () => {
    setCurrentId((id) => id + 1);
  };

  const handleClickPrevButton = () => {
    setCurrentId((id) => (id <= 1 ? id : id - 1));
  };

  useEffect(() => {
    setIsLoading(true);

    getUser(currentId)
      .then((res) => {
        setUser(res);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [currentId]);

  if (isError) {
    return <section>Algo deu errado</section>;
  }

  if (!user || isLoading) {
    return <section>Loading...</section>;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        handleClickNextButton,
        handleClickPrevButton,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
