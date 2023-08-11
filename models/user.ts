import { ethers } from "ethers";
import { Role } from "../utils/types";

export default class User {
  name: string;
  url: string;
  created: boolean;
  verified: boolean;
  role: Role;
  no_of_credentials: ethers.BigNumber;

  constructor(
    _name: string,
    profile: string,
    created: boolean,
    isVerified: boolean,
    noOfCertificates: ethers.BigNumber,
    role: Role
  ) {
    this.created = created;
    this.verified = isVerified;
    this.name = _name;
    this.no_of_credentials = noOfCertificates;
    this.url = profile;
    this.role = role;
  }
}
