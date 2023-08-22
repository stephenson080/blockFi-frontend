import { createContext, useEffect, useState } from "react";
import { useAddress, useConnectionStatus } from "@thirdweb-dev/react";

import {
  getCandidate,
  getInstitution,
} from "../web3/interactions/read-interacteration";
import User from "../models/user";
import { ethers } from "ethers";
import { Role } from "../utils/types";

export const UserContext = createContext<{
  user: User | undefined;
  refetchUser: () => void;
}>({ user: undefined, refetchUser: () => {} });

export default function UserContextProvider(props: any) {
  const [user, setUser] = useState<User>();
  const status = useConnectionStatus();
  const address = useAddress();

  useEffect(() => {
    if (status === "connected") {
      getUser();
    }
  }, [status, address]);

  function refetchUser() {
    getUser();
  }
  async function getUser() {
    if (!address) return;

    let user;
    user = await getCandidate(address);
    if (user && !user.created) {
      user = await getInstitution(address);
      if (user && user.created) {
        const _user = new User(
          user.name,
          user.website,
          user.created,
          user.verified,
          ethers.BigNumber.from(0),
          Role.Institution
        );
        setUser(_user);
        return;
      }
    }
    const _user = new User(
      user.name,
      user.profile_uri,
      user.created,
      user.is_verified,
      user.no_of_credentials,
      Role.Candidate
    );
    setUser(_user);
  }

  return (
    <UserContext.Provider value={{ user, refetchUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
