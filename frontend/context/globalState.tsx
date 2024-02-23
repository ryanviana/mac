import React, { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
// import { AccountInterface } from 'get-starknet';
import { AccountInterface, ProviderInterface } from "starknet";

interface UserContextType {
  user: any; // Replace 'any' with the specific type of your user data
  setUser: Dispatch<SetStateAction<any>>; // Replace 'any' with the type of the user data
  provider: AccountInterface | ProviderInterface | undefined;
  setProvider: Dispatch<SetStateAction<AccountInterface | ProviderInterface | undefined>>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {
    console.warn("setUser function not overridden");
  },
  provider: undefined,
  setProvider: () => {
    console.warn("setProvider function not overridden");
  },
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null); // Replace 'any' with the type of your user data
  const [provider, setProvider] = useState<AccountInterface | ProviderInterface | undefined>(undefined);

  return <UserContext.Provider value={{ user, setUser, provider, setProvider }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
